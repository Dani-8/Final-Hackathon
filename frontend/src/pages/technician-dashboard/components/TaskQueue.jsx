import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { IssueStatusBadge, PriorityBadge } from '../../../components/StatusBadge.jsx';

export function TaskQueue({ issues }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h2 className="font-display font-bold text-slate-800 text-md">My Current Queue</h2>
            </div>

            {issues.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                    <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-semibold text-sm">All clear! No pending dispatches assigned.</p>
                    <p className="text-xs mt-1">Excellent work keeping our facilities running smooth.</p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {issues.map((issue) => (
                        <div key={issue._id} className="p-6 hover:bg-slate-50/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2 max-w-xl">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                        {issue.issueNumber}
                                    </span>
                                    <PriorityBadge priority={issue.priority} />
                                    <IssueStatusBadge status={issue.status} />
                                </div>

                                <div>
                                    <h3 className="text-md font-bold text-slate-800 leading-tight">{issue.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">"{issue.description}"</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-1.5 text-xs text-slate-500 font-medium">
                                    <div>
                                        <span className="text-slate-400 font-normal">Asset node:</span> <span className="font-semibold text-slate-700">{issue.asset?.name || 'Unknown'}</span>
                                    </div>

                                    <div>
                                        <span className="text-slate-400 font-normal">Location:</span> <span className="font-semibold text-slate-700">{issue.asset?.location || 'Unknown'}</span>
                                    </div>
                                </div>
                            </div>


                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Link
                                    id={`perform-maintenance-btn-${issue.issueNumber}`}
                                    to={`/technician/issues/${issue._id}/work`}
                                    className="w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    <Wrench className="w-3.5 h-3.5 text-teal-400" />
                                    <span>Perform Maintenance</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
