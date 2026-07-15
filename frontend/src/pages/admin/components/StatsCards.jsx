import React from 'react';
import { Package, CheckCircle, AlertTriangle } from 'lucide-react';


export function StatsCards({ stats }) {
    const { totalAssets, operationalAssets, activeIssues, outOfServiceAssets } = stats;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Assets */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div className="bg-indigo-50 text-indigo-600 p-3 rounded-lg">
                    <Package className="w-6 h-6" />
                </div>

                <div>
                    <p className="text-xs text-slate-500 font-medium">Total Registered Assets</p>
                    <p className="text-2xl font-bold text-slate-800">{totalAssets}</p>
                </div>
            </div>

            {/* Operational */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6" />
                </div>

                <div>
                    <p className="text-xs text-slate-500 font-medium">Operational Assets</p>
                    <p className="text-2xl font-bold text-slate-800">{operationalAssets}</p>
                </div>
            </div>

            {/* Total Active Issues */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div className="bg-amber-50 text-amber-600 p-3 rounded-lg">
                    <AlertTriangle className="w-6 h-6" />
                </div>

                <div>
                    <p className="text-xs text-slate-500 font-medium">Pending Active Issues</p>
                    <p className="text-2xl font-bold text-slate-800">{activeIssues}</p>
                </div>
            </div>

            {/* Out of Service */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div className="bg-rose-50 text-rose-600 p-3 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-rose-600 animate-pulse" />
                </div>

                <div>
                    <p className="text-xs text-slate-500 font-medium">Out of Service Assets</p>
                    <p className="text-2xl font-bold text-slate-800">{outOfServiceAssets}</p>
                </div>
            </div>
        </div>
    );
}
