import { User } from "./user";


export type Transaction = {
  id: number;
  user: User;
  transaction_type: "airtime" | "data" | "cable_tv" | "electricity" | "other";
  amount: string;
  status: "pending" | "success" | "failed";
  reference: string;
  provider_response: string;
  created_at: string; // ISO timestamp
};


