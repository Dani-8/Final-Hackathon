import React from 'react';
import { User, ExternalLink } from 'lucide-react';
import { IssueStatusBadge, PriorityBadge } from '../../../components/StatusBadge.jsx';

export function IssueTable({
    issues,
    setAssigningIssue,
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Issue Number</th>
                            <th className="px-6 py-3">Specification</th>
                            <th className="px-6 py-3">Asset Connection</th>
                            <th className="px-6 py-3">Priority</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Dispatch Tech</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {issues.map((issue) => (
                            <tr key={issue._id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-mono text-xs text-slate-800 font-bold">
                                    {issue.issueNumber}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="font-semibold text-slate-800">{issue.title}</div>
                                    <p className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5">{issue.description}</p>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-700">{issue.asset?.name || 'Unknown'}</div>
                                    <p className="text-xs text-slate-400 font-mono">{issue.asset?.assetCode || 'Unknown'}</p>
                                </td>

                                <td className="px-6 py-4">
                                    <PriorityBadge priority={issue.priority} />
                                </td>

                                <td className="px-6 py-4">
                                    <IssueStatusBadge status={issue.status} />
                                </td>

                                <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                                    {issue.assignedTechnician ? (
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-indigo-500" />
                                            <span>{issue.assignedTechnician.name}</span>
                                        </div>
                                    ) : (
                                        <span className="text-rose-600 font-semibold italic bg-rose-50 border border-rose-100 px-2 py-0.5 rounded text-[10px]">Unassigned</span>
                                    )}
                                </td>
                                
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {issue.status === 'Reported' && (
                                            <button
                                                id={`assign-tech-btn-${issue.issueNumber}`}
                                                onClick={() => setAssigningIssue(issue)}
                                                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-2.5 py-1.5 rounded transition-all cursor-pointer"
                                            >
                                                Assign Tech
                                            </button>
                                        )}
                                        <a
                                            href={`/public/assets/${issue.asset?.publicUrlSlug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 text-slate-400 hover:text-slate-600 border border-slate-200 bg-white rounded hover:bg-slate-50 transition-all"
                                            title="Open public asset page"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
