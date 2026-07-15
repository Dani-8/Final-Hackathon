import React from 'react';
import { AssetStatusBadge } from '../../../components/StatusBadge.jsx';
import { formatDate } from '../../../utils/formatDate.js';

export function AssetReadOnlyDetails({ asset }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-display font-semibold text-slate-800 text-lg mb-4">Asset Details</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Category Type</span>
                    <span className="text-sm font-semibold text-slate-700">{asset.category}</span>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Status State</span>
                    <div className="mt-1">
                        <AssetStatusBadge status={asset.status} />
                    </div>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Condition Grade</span>
                    <span className="text-sm font-semibold text-slate-700">{asset.condition}</span>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Installation Site</span>
                    <span className="text-sm font-semibold text-slate-700">{asset.location}</span>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Assigned Technician</span>
                    <span className="text-sm font-semibold text-slate-700">{asset.assignedTechnician?.name || 'Unassigned'}</span>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Last Service Date</span>
                    <span className="text-xs font-semibold text-slate-600">{formatDate(asset.lastServiceDate)}</span>
                </div>
                
                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Next Service Date</span>
                    <span className="text-xs font-semibold text-slate-600">{formatDate(asset.nextServiceDate)}</span>
                </div>
            </div>
        </div>
    );
}
