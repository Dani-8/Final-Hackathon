import React from 'react';
import { Link } from 'react-router-dom';
import { Info, AlertTriangle, Wrench } from 'lucide-react';
import { formatDate } from '../../../utils/formatDate.js';

export function SpecDetails({ asset, slug }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                <Info className="w-4.5 h-4.5 text-slate-400" />
                <span>Specifications & Maintenance Status</span>
            </h2>


            <div className="grid grid-cols-2 gap-6 pt-2">
                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Category</span>
                    <span className="text-sm font-semibold text-slate-700">{asset.category}</span>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Current Condition</span>
                    <span className="text-sm font-semibold text-slate-700">{asset.condition}</span>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Last Serviced</span>
                    <span className="text-sm font-semibold text-slate-700">{formatDate(asset.lastServiceDate)}</span>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Next Service Target</span>
                    <span className="text-sm font-semibold text-slate-700">{formatDate(asset.nextServiceDate)}</span>
                </div>
            </div>
            

            {!asset.isRetired ? (
                <div className="border-t border-slate-100 pt-6 mt-8">
                    <div className="bg-amber-50/55 border border-amber-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h4 className="font-display font-bold text-sm text-amber-900 flex items-center gap-1.5">
                                <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                                <span>Report Fault or Malfunction</span>
                            </h4>
                            <p className="text-xs text-amber-700 mt-0.5">Spotted damage, leaks, unusual noise, or fail-to-start? Let our technicians know.</p>
                        </div>
                        <Link
                            id="public-report-fault-btn"
                            to={`/public/assets/${slug}/report`}
                            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center"
                        >
                            <Wrench className="w-3.5 h-3.5" />
                            <span>Report Issue</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-500 text-center">
                    This asset node has been decommissioned/retired. Issue submission is disabled.
                </div>
            )}
        </div>
    );
}
