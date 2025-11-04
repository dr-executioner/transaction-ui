/* eslint-disable @typescript-eslint/no-explicit-any */
import { Activity, CheckCircle2, Clock, Search } from "lucide-react";
import { useState } from "react";
import { useTransactions } from "../hooks/useTransaction";

export const TransactionLookup = () => {
    const [txnId, setTxnId] = useState("");
    const { transaction, loading, error, fetchTransaction } = useTransactions();

    const handleSearch = () => {
        fetchTransaction(txnId);
    };

    const getStatusColor = (status: string) => {
        const colors: any = {
            PROCESSED: "bg-green-100 text-green-700 border-green-200",
            PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
            FAILED: "bg-red-100 text-red-700 border-red-200"
        };
        return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
    };

    return (
        <div className="bg-white rounded-md border-2 border-slate-200 shadow-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-50"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Transaction Lookup</h3>
                            <p className="text-sm text-gray-600">Search by Transaction ID</p>
                        </div>
                    </div>
                    {transaction && (
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                            title="Refresh"
                        >
                            <Activity className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    )}
                </div>

                <div className="flex gap-2 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter Transaction ID"
                            value={txnId}
                            onChange={(e) => setTxnId(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading || !txnId.trim()}
                        className="px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Search"
                        )}
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm mb-3">
                        {error}
                    </div>
                )}

                {transaction && (
                    <div className="space-y-3 animate-fade-in">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-600">Status</span>
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border-2 ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-blue-50 rounded-xl border-2 border-blue-100">
                                <div className="text-xs text-gray-600 mb-1">From</div>
                                <div className="text-sm font-mono font-semibold text-gray-900 truncate">
                                    {transaction.source_account}
                                </div>
                            </div>
                            <div className="p-3 bg-green-50 rounded-xl border-2 border-green-100">
                                <div className="text-xs text-gray-600 mb-1">To</div>
                                <div className="text-sm font-mono font-semibold text-gray-900 truncate">
                                    {transaction.destination_account}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
                            <div className="text-xs text-gray-600 mb-1">Amount</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {transaction.currency} {transaction.amount.toLocaleString()}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <div className="text-gray-600 mb-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Created
                                </div>
                                <div className="font-mono text-gray-900">
                                    {new Date(transaction.created_at).toLocaleString()}
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <div className="text-gray-600 mb-1 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Processed
                                </div>
                                <div className="font-mono text-gray-900">
                                    {new Date(transaction.processed_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};