import React from 'react';
import { AssetStatusBadge } from '../../../components/StatusBadge.jsx';

export function AssetHeader({ asset }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-800 text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded font-bold mb-2">
                    Verified Property Node
                </span>
                
                <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">{asset.name}</h1>
                <p className="text-xs text-slate-400 font-mono mt-1">NODE REFERENCE: {asset.assetCode}</p>
            </div>

            <div className="flex flex-col items-end gap-1.5 self-stretch md:self-auto">
                <AssetStatusBadge status={asset.status} />
                <span className="text-[10px] text-slate-400 font-mono">Location: {asset.location}</span>
            </div>
        </div>
    );
}
