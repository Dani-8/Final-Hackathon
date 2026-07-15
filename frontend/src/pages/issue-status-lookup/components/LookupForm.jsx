import React from 'react';
import { Search } from 'lucide-react';

export function LookupForm({
    activeTab,
    issueNumber,
    setIssueNumber,
    assetCode,
    setAssetCode,
    loading,
    handleSubmit,
    lookupAssetByCode,
}) {
    return (
        <div>
            {activeTab === 'ticket' ? (
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-2">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-4.5 w-4.5 text-slate-400" />
                        </div>

                        <input
                            type="text"
                            required
                            value={issueNumber}
                            onChange={(e) => setIssueNumber(e.target.value)}
                            placeholder="e.g. ISS-2026-10204"
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono font-semibold text-slate-800 text-sm"
                        />
                    </div>

                    <button
                        id="trigger-status-lookup-btn"
                        type="submit"
                        disabled={loading}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs py-3 px-5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Searching...' : 'Lookup Ticket'}
                    </button>
                </form>
            ) : (
                <form onSubmit={lookupAssetByCode} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-2">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-4.5 w-4.5 text-slate-400" />
                        </div>

                        <input
                            type="text"
                            required
                            value={assetCode}
                            onChange={(e) => setAssetCode(e.target.value)}
                            placeholder="Enter Asset ID (e.g. AST-001)"
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono font-semibold text-slate-800 text-sm uppercase"
                        />
                    </div>
                    
                    <button
                        id="trigger-asset-lookup-btn"
                        type="submit"
                        disabled={loading}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs py-3 px-5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Searching...' : 'Look Up Asset'}
                    </button>
                </form>
            )}
        </div>
    );
}
