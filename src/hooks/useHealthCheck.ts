/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import * as api from "../api/healthCheck.api";
import type { HealthResponse } from "../types/index.types";

export const useHealthCheck = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkHealth = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.getHealth();
      setHealth(response);
    } catch (err) {
      setError("Failed to fetch health status");
    } finally {
      setLoading(false);
    }
  };

  return { health, loading, error, checkHealth };
};
