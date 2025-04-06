// types/user.ts

export type Role = "customer" | "admin" | "moderator"; // Extend based on your actual Role enum

export interface UserBase {
  email: string;
  first_name: string;
  last_name: string;
  role?: Role;
  gender?: string | null;
  phone_number?: string | null;
  image_url?: string | null;
  is_oauth?: boolean;
  oauth_provider?: string;
  email_is_verified?: boolean;
  is_active?: boolean;
  is_staff?: boolean;
}

export interface UserCreate {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  oauth_provider?: string;
  email_is_verified?: boolean;
  is_staff?: boolean;
  role?: Role;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  gender?: string;
  phone_number?: string;
  image_url?: string;
  role?: Role;
  is_staff?: boolean;
}

export interface UserResponse extends UserBase {
  id: string;             // UUID
  date_joined: string;    // ISO date string
}

export interface CreateUserResponse {
  token: string;
  user: UserResponse;
}

export interface TokenResponse {
  token: string;
}

// Activity Section
export type ActivityTypeEnum = "create" | "update" | "delete"; // Extend as needed

export interface ActivityBase {
  description: string;
  activity_type?: ActivityTypeEnum;
  user_id: string;       // UUID
}

export interface ActivityCreate extends ActivityBase {}

export interface ActivityResponse extends ActivityBase {
  id: string;
  created_at: string;    // ISO date string
}
