export interface Transaction {
  transaction_id: string;
  source_account: string;
  destination_account: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  processed_at: string;
}

export interface HealthResponse {
  current_time : string
  status : "HEALTHY" | null
}

export interface FormState {
  amount: string;
  currency: string;
  destination_account: string;
  source_account: string;
}