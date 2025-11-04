import { useState, type FormEvent } from "react";
import { ArrowRightLeft, Send, CheckCircle2, Hash, TrendingUp } from "lucide-react";
import { useTransactions } from "../hooks/useTransaction";
import { FORM_FIELDS_CONFIG } from "../constants/constants";
import { generateTransactionId } from "../utils/helper";
import { DynamicInput } from "./DynamicInput";
import { HealthCheck } from "./HealthCheck";
import { TransactionLookup } from "./TransactionCheck";
import { useTransactionContext } from "../context/transaction";
import type { FormState } from "../types/index.types";


export default function TransactionForm() {
    const { submitTransaction, loading, error, success } = useTransactions();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [form, setForm] = useState<FormState | any>(
        FORM_FIELDS_CONFIG.reduce((acc, field) => {
            if (field.type === "select" && field.options) {
                acc[field.name] = field.options[0].value;
            } else {
                acc[field.name] = "";
            }
            return acc;
        }, {} as Record<string, string>)
    );
    const [focusedField, setFocusedField] = useState("");

    const { id: generatedId, setId } = useTransactionContext()

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const id = generateTransactionId();
        setId(id)

        const payload = {
            ...form,
            transaction_id: id,
            amount: parseFloat(form.amount),
        };

        submitTransaction(payload);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 ">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Transaction Dashboard</h1>
                    <p className="text-gray-600">Manage and monitor your financial transactions</p>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                    {/* Responsive Grid Layout */}
                    <div className="">
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                            {/* Health Check - Spans 1 column */}
                            <div className="lg:col-span-1">
                                <HealthCheck />
                            </div>

                            {/* Transaction Lookup - Spans 2 columns */}
                            <div className="lg:col-span-1">
                                <TransactionLookup />
                            </div>
                        </div>
                    </div>

                    {/* Transaction Form - Full width */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-md border-2 border-slate-200 shadow-xl p-8 space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full -mr-20 -mt-20 opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full -ml-16 -mb-16 opacity-50"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <ArrowRightLeft className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">New Transaction</h2>
                                        <p className="text-sm text-gray-600">Create a secure transfer</p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {!error && generatedId && (
                                        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Hash className="w-4 h-4 text-blue-600" />
                                                <span className="text-gray-600">Transaction ID:</span>
                                                <span className="font-mono font-semibold text-blue-600">{generatedId}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-3 gap-4">
                                        {FORM_FIELDS_CONFIG.map((field) => (
                                            <div
                                                key={field.name}
                                                className={field.colSpan === "full" ? "col-span-3" : field.colSpan === "2/3" ? "col-span-2" : "col-span-1"}
                                            >
                                                <DynamicInput
                                                    field={field}
                                                    value={form[field.name]}
                                                    onChange={onChange}
                                                    onFocus={setFocusedField}
                                                    onBlur={() => setFocusedField('')}
                                                    focusedField={focusedField}
                                                    currencyValue={form.currency}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={onSubmit}
                                        disabled={loading || success}
                                        className={`w-full py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 ${success
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                                            } disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : success ? (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                Success!
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Submit Transaction
                                            </>
                                        )}
                                    </button>

                                    {error && (
                                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm animate-shake">
                                            {error}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secured with 256-bit encryption
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }

                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }

                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            `}</style>
        </div>
    );
}