export interface Transaction {
  transaction_id: string;
  source_account: string;
  destination_account: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  processed_at?: string | null;
}

export interface HealthResponse {
  current_time : string
  status : "HEALTHY" | any
}