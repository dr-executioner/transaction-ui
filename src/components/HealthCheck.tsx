import { Activity, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { useHealthCheck } from "../hooks/useHealthCheck";

export const HealthCheck = () => {
    const { health, loading, error, checkHealth } = useHealthCheck();

    console.log(health)
    console.log(error)
    useEffect(() => {
        checkHealth();
    }, []);

    return (
        <div className="bg-white rounded-md border-2 border-slate-200 shadow-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-green-100 to-emerald-100 rounded-full -mr-16 -mt-16 opacity-50"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">System Health</h3>
                            <p className="text-sm text-gray-600">API Status Monitor</p>
                        </div>
                    </div>
                    <button
                        onClick={checkHealth}
                        disabled={loading}
                        className="p-2 border-2 border-slate-300 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                        title="Refresh"
                    >
                        <RefreshCcw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                <div className="space-y-3">
                    <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${health?.status === "HEALTHY" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50" }`}>
                        <span className="text-sm font-medium text-gray-700">Status</span>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 ${health?.status === "HEALTHY" ? "bg-green-500" : "bg-red-500" }  rounded-full animate-pulse`}></div>
                            <span className={`font-bold ${health?.status === "HEALTHY" ? "text-green-500" : "text-red-500" } `}>{health?.status || "Server Down"}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Server Time</span>
                        <span className="text-sm font-mono text-gray-900">
                            {new Date(health?.current_time || Date.now()).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};