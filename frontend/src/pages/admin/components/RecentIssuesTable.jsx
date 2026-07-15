import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IssueStatusBadge, PriorityBadge } from '../../../components/StatusBadge.jsx';
import { formatDate } from '../../../utils/formatDate.js';


export function RecentIssuesTable({ issues }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <h2 className="font-display font-semibold text-slate-800 text-lg">Recently Logged Issues</h2>

                <Link to="/admin/issues" className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1">
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {issues.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                    No active issues reported. Your systems are clean!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-3">Issue Num</th>
                                <th className="px-6 py-3">Asset</th>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Reported At</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {issues.slice(0, 5).map((issue) => (
                                <tr key={issue._id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-700 font-semibold">
                                        <Link to={`/admin/issues`} className="text-indigo-600 hover:underline">
                                            {issue.issueNumber}
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-800 truncate max-w-[140px]">{issue.asset?.name || 'Unknown'}</p>
                                        <p className="text-xs text-slate-400 font-mono">{issue.asset?.assetCode}</p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <PriorityBadge priority={issue.priority} />
                                    </td>

                                    <td className="px-6 py-4">
                                        <IssueStatusBadge status={issue.status} />
                                    </td>

                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {formatDate(issue.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
