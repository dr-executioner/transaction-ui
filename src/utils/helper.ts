import { DollarSign, EuroIcon, IndianRupee, PoundSterling } from "lucide-react";
import { useEffect, useRef } from "react";

type UseInterval = <T, U>(
  callback: (vars?: U) => T,
  delay: number | null
) => void;

export const generateTransactionId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `txn_${timestamp}_${random}`;
};

export const generateSymbol = (currency: string) => {
  switch (currency) {
    case "GBP":
      return PoundSterling;
    case "USD":
      return DollarSign;
    case "EUR":
      return EuroIcon;
    default:
      return IndianRupee;
  }
};

export const useInterval: UseInterval = (callback, delay) => {
  const callbackRef = useRef<typeof callback | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (callbackRef.current) {
        callbackRef.current();
      }
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
