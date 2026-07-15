import React from 'react';
import { PriorityBadge, IssueStatusBadge } from '../../../components/StatusBadge.jsx';

export function IssueSpecsCard({ issue }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
                <PriorityBadge priority={issue.priority} />
                <IssueStatusBadge status={issue.status} />
            </div>

            <div>
                <h2 className="font-display font-extrabold text-slate-800 text-lg leading-snug">{issue.title}</h2>

                <p className="text-sm text-slate-600 mt-2 bg-slate-50 border border-slate-100 rounded-lg p-3.5 leading-relaxed font-medium">
                    "{issue.description}"
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Target Asset Node</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{issue.asset?.name} ({issue.asset?.assetCode})</span>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Site installation location</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{issue.asset?.location}</span>
                </div>
            </div>

            {/* Display evidence images attached during public report */}
            {issue.evidenceUrls && issue.evidenceUrls.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">Public Evidence Attachments</span>
                    
                    <div className="flex flex-wrap gap-3">
                        {issue.evidenceUrls.map((url, idx) => (
                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="relative w-20 h-20 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden block">
                                <img src={url} alt="Attached public evidence" className="w-full h-full object-cover hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
