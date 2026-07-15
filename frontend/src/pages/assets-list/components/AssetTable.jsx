import React from 'react';
import { Link } from 'react-router-dom';
import { AssetStatusBadge } from '../../../components/StatusBadge.jsx';

export function AssetTable({
    assets,
    selectedAssetIds,
    handleSelectAll,
    toggleSelectAsset,
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 w-10">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedAssetIds.length === assets.length && assets.length > 0}
                                    className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                                />
                            </th>
                            <th className="px-6 py-3">Asset Code</th>
                            <th className="px-6 py-3">Asset Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Condition</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-slate-100">
                        {assets.map((asset) => (
                            <tr key={asset._id} className={`hover:bg-slate-50/50 ${asset.isRetired ? 'bg-slate-50/40 text-slate-400' : ''}`}>
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedAssetIds.includes(asset._id)}
                                        onChange={() => toggleSelectAsset(asset._id)}
                                        className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                                    />
                                </td>

                                <td className="px-6 py-4 font-mono text-xs text-slate-800 font-semibold">
                                    {asset.assetCode}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="font-semibold text-slate-800">{asset.name}</div>
                                    {asset.isRetired && (
                                        <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-slate-200 text-slate-600 mt-1">
                                            Retired
                                        </span>
                                    )}
                                </td>

                                <td className="px-6 py-4 text-xs font-medium">
                                    {asset.category}
                                </td>

                                <td className="px-6 py-4 text-xs">
                                    {asset.location}
                                </td>

                                <td className="px-6 py-4 text-xs">
                                    {asset.condition}
                                </td>

                                <td className="px-6 py-4">
                                    <AssetStatusBadge status={asset.status} />
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <Link
                                        to={`/admin/assets/${asset._id}`}
                                        className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded transition-all"
                                    >
                                        Manage Tags
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
