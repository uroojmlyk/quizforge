





// lib/stripe.ts
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
});

// ✅ Your actual Price IDs from Stripe
export const PRICE_IDS = {
  PRO_MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_1TTkhv0s8OwFdkEhyGrKdb2b',
  PRO_YEARLY: process.env.STRIPE_PRO_YEARLY_PRICE_ID || 'price_1TTkib0s8OwFdkEhjZIeXlQf',
  TEAM_MONTHLY: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID || 'price_1TTkjI0s8OwFdkEhV5ZBd2HA',
  TEAM_YEARLY: process.env.STRIPE_TEAM_YEARLY_PRICE_ID || 'price_1TTkjq0s8OwFdkEhIhIRxx8x',
};

export const getPriceId = (plan: string, billingPeriod: 'monthly' | 'yearly') => {
  if (plan === 'pro') {
    return billingPeriod === 'monthly' ? PRICE_IDS.PRO_MONTHLY : PRICE_IDS.PRO_YEARLY;
  }
  if (plan === 'team') {
    return billingPeriod === 'monthly' ? PRICE_IDS.TEAM_MONTHLY : PRICE_IDS.TEAM_YEARLY;
  }
  return null;
};