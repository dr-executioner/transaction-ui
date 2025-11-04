const API_BASE = import.meta.env.VITE_TRANSACTION_SERVICE_BASE_URL;
export async function getHealth(): Promise<any> {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) {
    throw new Error("Transaction not found");
  }
  return res.json();
}
