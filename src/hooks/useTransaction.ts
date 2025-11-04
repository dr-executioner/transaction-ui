/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import * as api from "../api/transaction.api";
import type { Transaction } from "../types/index.types";

export function useTransactions() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTransaction = async (data: Transaction) => {
    setLoading(true);
    setError(null);

    if (!data.source_account) {
      setError("Source is Required");
      setLoading(false);
      return;
    }
    if (!data.destination_account) {
      setError("Destination is Required");
      setLoading(false);
      return;
    }
    if (!data.amount || data.amount === Number("NaN")) {
      setError("Amount is Required");
      setLoading(false);
      return;
    }
    try {
      await api.postTransaction(data);
      setSuccess(true);
    } catch (err) {
      setError("Failed to submit transaction");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransaction = async (transaction_id: string) => {
    setLoading(true);
    setError(null);
    try {
      const txn = await api.getTransaction(transaction_id);
      setTransaction(txn);
    } catch {
      setError("Transaction not found");
      setTransaction(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    transaction,
    loading,
    error,
    submitTransaction,
    fetchTransaction,
    success,
  };
}
