// types/wallet.ts

export type WalletType = "naira" | "usd" | "crypto"; // Adjust if you have more

export interface WalletBase {
  user_id: string;    // UUID
  balance: number;
}

export interface WalletCreate extends WalletBase {
  wallet_type: WalletType;
}

export interface WalletUpdate {
  id: string;         // UUID
  balance?: number;
}

export interface WalletResponse extends WalletBase {
  id: string;         // UUID
}

// Transaction

export type TransactionType = "topup" | "withdraw" | "transfer"; // Update if more types exist

export interface TransactionBase {
  user_id: string;          // UUID
  wallet_id: string;        // UUID
  transaction_type: TransactionType;
  amount: number;
  status: string;           // "pending", "success", etc.
  provider_response?: Record<string, any> | null;
}

export interface TransactionCreate extends TransactionBase {}

export interface TransactionResponse extends TransactionBase {
  id: string;               // UUID
  reference: string;
  created_at: string;       // ISO string
}
