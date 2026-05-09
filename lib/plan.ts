// lib/plan.ts
import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';
export interface UserPlan {
  plan: 'free' | 'pro' | 'team';
  subscriptionStatus: 'active' | 'past_due' | 'canceled' | null;
}

export async function getUserPlan(userId: string): Promise<UserPlan> {
  const client = await clientPromise;
  const db = client.db('quizDB');
  
  const user = await db.collection('users').findOne(
    { _id: new ObjectId(userId) },
    { projection: { plan: 1, subscriptionStatus: 1 } }
  );
  
  return {
    plan: user?.plan || 'free',
    subscriptionStatus: user?.subscriptionStatus || null,
  };
}

export function canAccessFeature(plan: UserPlan['plan'], feature: string): boolean {
  const features = {
    aiGenerator: ['pro', 'team'],
    unlimitedQuizzes: ['pro', 'team'],
    advancedAnalytics: ['pro', 'team'],
    customBranding: ['team'],
    sso: ['team'],
  };
  
  const allowedPlans = features[feature as keyof typeof features] || [];
  return allowedPlans.includes(plan);
}