import React from 'react';
import { Clock } from 'lucide-react';
import { formatDate } from '../../../utils/formatDate.js';

export function ActivityLogs({ history }) {
    return (
        <div className="bg-white h-90 overflow-scroll border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-display font-bold text-slate-800 text-md mb-4 flex items-center gap-1.5">
                <Clock className="w-4.5 h-4.5 text-slate-400" />
                <span>Recent Activity Logs</span>
            </h2>

            {history.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No public logs recorded.</p>
            ) : (
                <div className="space-y-4">
                    {history.map((log, idx) => (
                        <div key={idx} className="border-l-2 border-indigo-100 pl-3.5 py-0.5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-700">{log.action}</span>
                                <span className="text-[9px] text-slate-400 font-mono">{formatDate(log.createdAt)}</span>
                            </div>

                            <p className="text-[11px] text-slate-500 mt-1">{log.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
