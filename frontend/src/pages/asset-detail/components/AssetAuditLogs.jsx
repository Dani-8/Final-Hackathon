import React from 'react';
import { formatDateTime } from '../../../utils/formatDate.js';

function getLogMeta(log) {
    const actorName = log.actor || 'Public';
    const role = log.actorRole || '';

    // Determine Category
    let category = 'public'; // fallback
    if (role === 'system' || actorName === 'System Auto' || actorName.toLowerCase().includes('system auto')) {
        category = 'system';
    } else if (role === 'admin' || actorName.toLowerCase().includes('admin')) {
        category = 'admin';
    } else if (role === 'technician') {
        category = 'technician';
    } else if (actorName === 'Public' || role === 'public') {
        category = 'public';
    } else {
        // Smart fallback detection based on actor name
        const lowerActor = actorName.toLowerCase();
        if (lowerActor.includes('admin') || lowerActor.includes('manager') || lowerActor.includes('staff')) {
            category = 'admin';
        } else if (lowerActor.includes('tech') || lowerActor.includes('service') || lowerActor.includes('engineer') || lowerActor === 'ali') {
            category = 'technician';
        } else {
            category = 'public';
        }
    }

    // Styles map
    const configs = {
        system: {
            dotColor: 'bg-slate-400',
            borderColor: 'border-slate-300',
            badgeBg: 'bg-slate-50 text-slate-700 border border-slate-200',
            actorLabel: 'System Automation',
            actorTextColor: 'text-slate-500',
            roleBadgeBg: 'bg-slate-100 text-slate-600 border border-slate-200',
            roleText: 'System'
        },
        admin: {
            dotColor: 'bg-indigo-500',
            borderColor: 'border-indigo-400',
            badgeBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
            actorLabel: actorName,
            actorTextColor: 'text-indigo-900',
            roleBadgeBg: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
            roleText: 'Admin/Staff'
        },
        technician: {
            dotColor: 'bg-emerald-500',
            borderColor: 'border-emerald-400',
            badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
            actorLabel: actorName,
            actorTextColor: 'text-emerald-900',
            roleBadgeBg: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
            roleText: 'Technician'
        },
        public: {
            dotColor: 'bg-amber-500',
            borderColor: 'border-amber-400',
            badgeBg: 'bg-amber-50 text-amber-700 border border-amber-200',
            actorLabel: actorName === 'Public' ? 'Occupant / Public' : actorName,
            actorTextColor: 'text-amber-900',
            roleBadgeBg: 'bg-amber-100 text-amber-700 border border-amber-200',
            roleText: 'Public Reporter'
        }
    };

    return configs[category];
}

export function AssetAuditLogs({ history }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-display font-semibold text-slate-800 text-lg mb-4">Append-Only Audit History Logs</h2>
            {history.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">No historical logs recorded for this asset node.</p>
            ) : (
                <div className="relative border-l border-slate-200 ml-4 pl-6 space-y-6">
                    {history.map((log) => {
                        const meta = getLogMeta(log);
                        return (
                            <div key={log._id} className="relative">
                                {/* Circle icon on timeline */}
                                <div className={`absolute left-[-31px] top-1 w-4.5 h-4.5 bg-white border-2 ${meta.borderColor} rounded-full flex items-center justify-center`}>
                                    <div className={`w-1.5 h-1.5 ${meta.dotColor} rounded-full`}></div>
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`font-bold text-[11px] px-2 py-0.5 rounded uppercase tracking-wider ${meta.badgeBg}`}>
                                            {log.action}
                                        </span>

                                        <span className="text-[10px] text-slate-400 font-mono">
                                            {formatDateTime(log.createdAt)}
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate-700 mt-1.5 leading-relaxed font-normal">
                                        {log.description}
                                    </p>

                                    <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                                        <span className="text-slate-400">Logged by:</span>
                                        
                                        <span className={`font-semibold ${meta.actorTextColor}`}>
                                            {meta.actorLabel}
                                        </span>

                                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.25 rounded-full tracking-wider ${meta.roleBadgeBg}`}>
                                            {meta.roleText}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
