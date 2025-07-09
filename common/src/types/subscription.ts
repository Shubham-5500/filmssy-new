import { z } from 'zod';

// Subscription plan types
export enum PlanInterval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  QUARTERLY = 'quarterly'
}

export enum PlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  PAST_DUE = 'past_due',
  TRIALING = 'trialing'
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  STRIPE = 'stripe',
  RAZORPAY = 'razorpay',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay'
}

// Subscription plan interface
export interface SubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  features: string[];
  price: PlanPrice[];
  maxDevices: number;
  maxDownloads: number;
  videoQuality: string[]; // ['SD', 'HD', 'FHD', '4K']
  allowedContent: string[]; // content IDs or 'all'
  isPopular: boolean;
  isVisible: boolean;
  status: PlanStatus;
  trialPeriod?: number; // days
  stripePriceId?: string;
  razorpayPlanId?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanPrice {
  currency: string; // ISO 4217
  amount: number; // in cents
  interval: PlanInterval;
  intervalCount: number; // e.g., 3 for quarterly
}

// User subscription interface
export interface UserSubscription {
  _id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  trialEndDate?: Date;
  autoRenew: boolean;
  currency: string;
  amount: number;
  interval: PlanInterval;
  paymentMethod: PaymentMethod;
  externalSubscriptionId?: string; // Stripe/Razorpay subscription ID
  cancelledAt?: Date;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment transaction interface
export interface PaymentTransaction {
  _id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  externalTransactionId?: string;
  externalPaymentIntentId?: string;
  invoice?: string;
  receipt?: string;
  failureReason?: string;
  refundAmount?: number;
  refundReason?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Coupon and discount interfaces
export interface Coupon {
  _id: string;
  code: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed';
  value: number; // percentage or fixed amount
  currency?: string; // for fixed amount coupons
  maxUses?: number;
  usedCount: number;
  minAmount?: number; // minimum order amount
  maxDiscount?: number; // maximum discount amount
  applicablePlans: string[]; // plan IDs or 'all'
  isActive: boolean;
  validFrom: Date;
  validTo: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CouponUsage {
  _id: string;
  couponId: string;
  userId: string;
  subscriptionId: string;
  discountAmount: number;
  currency: string;
  usedAt: Date;
}

// Payment validation schemas
export const createSubscriptionSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  paymentMethod: z.nativeEnum(PaymentMethod),
  currency: z.string().length(3, 'Currency must be 3 characters'),
  couponCode: z.string().optional(),
  autoRenew: z.boolean().default(true)
});

export const updatePaymentMethodSchema = z.object({
  paymentMethod: z.nativeEnum(PaymentMethod),
  paymentDetails: z.record(z.any()).optional()
});

export const applyCouponSchema = z.object({
  couponCode: z.string().min(1, 'Coupon code is required'),
  planId: z.string().min(1, 'Plan ID is required')
});

// Gift subscription interface
export interface GiftSubscription {
  _id: string;
  gifterId: string; // user who gave the gift
  recipientEmail: string;
  recipientId?: string; // set when recipient claims
  planId: string;
  duration: number; // in months
  message?: string;
  status: 'pending' | 'claimed' | 'expired';
  claimCode: string;
  expiryDate: Date;
  claimedAt?: Date;
  createdAt: Date;
}

// Revenue analytics interface
export interface RevenueMetrics {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  currency: string;
  newSubscriptions: number;
  renewals: number;
  cancellations: number;
  refunds: number;
  averageRevenuePerUser: number;
  churnRate: number;
  conversionRate: number;
  planBreakdown: PlanRevenue[];
}

export interface PlanRevenue {
  planId: string;
  planName: string;
  revenue: number;
  subscriptions: number;
  percentage: number;
}

// Billing address interface
export interface BillingAddress {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Tax configuration interface
export interface TaxConfiguration {
  _id: string;
  country: string;
  state?: string;
  taxRate: number; // percentage
  taxName: string; // e.g., 'GST', 'VAT', 'Sales Tax'
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Type exports
export type CreateSubscriptionData = z.infer<typeof createSubscriptionSchema>;
export type UpdatePaymentMethodData = z.infer<typeof updatePaymentMethodSchema>;
export type ApplyCouponData = z.infer<typeof applyCouponSchema>;