



// app/api/webhook/stripe/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('quizforge');

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const userId = session.client_reference_id || session.metadata?.userId;
      const plan = session.metadata?.plan;
      const stripeCustomerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (userId && plan && ObjectId.isValid(userId)) {
        await db.collection('users').updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              plan,
              subscriptionStatus: 'active',
              stripeCustomerId,
              stripeSubscriptionId: subscriptionId,
              updatedAt: new Date(),
            },
          }
        );
      }
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object;
      const status = subscription.status;
      const customerId = subscription.customer as string;

      const user = await db.collection('users').findOne({ stripeCustomerId: customerId });
      if (user) {
        const planStatus = status === 'active' ? 'active' : status === 'past_due' ? 'past_due' : 'canceled';
        await db.collection('users').updateOne(
          { _id: user._id },
          {
            $set: {
              subscriptionStatus: planStatus,
              updatedAt: new Date(),
            },
          }
        );
      }
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      const deletedCustomerId = deletedSubscription.customer as string;
      const canceledUser = await db.collection('users').findOne({ stripeCustomerId: deletedCustomerId });
      if (canceledUser) {
        await db.collection('users').updateOne(
          { _id: canceledUser._id },
          {
            $set: {
              plan: 'free',
              subscriptionStatus: 'canceled',
              updatedAt: new Date(),
            },
          }
        );
      }
      break;
  }

  return NextResponse.json({ received: true });
}