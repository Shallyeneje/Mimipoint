// types/easybuy.ts

export interface EasybuyPlanBase {
  name: string;
  description: string;
  price: number;
  no_of_products: number;
  duration: number;
}

export type EasybuyPlanCreate = EasybuyPlanBase;

export interface EasybuyPlanResponse extends EasybuyPlanBase {
  id: string; // UUID
  created_at: string; // ISO string
}

// -----------------------------------

export type SubscriptionStatus = "active" | "inactive" | "cancelled"; // Extend based on your Enum values

export interface EasybuySubscriptionBase {
  user_id: string; // UUID
  plan_id: string; // UUID
  status: SubscriptionStatus;
}

export type EasybuySubscriptionCreate = EasybuySubscriptionBase;

export interface EasybuySubscriptionResponse extends EasybuySubscriptionBase {
  id: string;
  start_date: string; // ISO string
  end_date: string; // ISO string
}

// -----------------------------------

export interface EasybuyChangeSubscriptionStatus {
  subscription_id: string;
  status: SubscriptionStatus;
}

export interface EasybuyChangeSubscriptionPlan {
  plan_id: string;
  subscription_id: string;
}

// -----------------------------------

export interface ProductBase {
  owner_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  tags: string[];
  redirect_link: string; // URL
}

export type ProductCreate = ProductBase;

export interface ProductResponse extends ProductBase {
  id: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}
