




// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import { stripe, getPriceId } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { plan, billingPeriod, userId, email } = await request.json();

    if (!plan || !billingPeriod || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const priceId = getPriceId(plan, billingPeriod);

    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan or billing period' },
        { status: 400 }
      );
    }

    // ✅ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      client_reference_id: userId, // ✅ Important: Link to your user
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
        billingPeriod,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          userId,
          plan,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}