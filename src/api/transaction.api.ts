import type { Transaction } from "../types/index.types";

const API_BASE = import.meta.env.VITE_TRANSACTION_SERVICE_BASE_URL;

export async function postTransaction(
  data: Omit<Transaction, "status" | "created_at" | "processed_at" | "transaction_id">
): Promise<void> {

  const transactionData = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  await fetch(`${API_BASE}/v1/webhooks/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionData),
  });
}

export async function getTransaction(
  transaction_id: string
): Promise<Transaction> {
  const res = await fetch(`${API_BASE}/v1/transactions/${transaction_id}`);
  if (!res.ok) {
    throw new Error("Transaction not found");
  }
  return res.json();
}
