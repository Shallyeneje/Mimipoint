export interface ComplaintBase {
  user_id: string; // UUID
  transaction_id?: string | null;
  complaint?: string | null;
}

export type ComplaintCreate = ComplaintBase;

export interface ComplaintResponse extends ComplaintBase {
  id: string; // UUID
}
