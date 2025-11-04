import { Building2, Wallet } from "lucide-react";

export const FORM_FIELDS_CONFIG = [
  {
    name: "source_account",
    label: "Source Account",
    type: "text",
    placeholder: "ACC-001",
    icon: Wallet,
    required: true,
    colSpan: "full",
  },
  {
    name: "destination_account",
    label: "Destination Account",
    type: "text",
    placeholder: "ACC-002",
    icon: Building2,
    required: true,
    colSpan: "full",
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "0.00",
    iconDynamic: true,
    required: true,
    step: "0.01",
    colSpan: "2/3",
  },
  {
    name: "currency",
    label: "Currency",
    type: "select",
    options: [
      { value: "INR", label: "INR" },
      { value: "USD", label: "USD" },
      { value: "EUR", label: "EUR" },
      { value: "GBP", label: "GBP" },
    ],
    required: true,
    colSpan: "1/3",
  },
];