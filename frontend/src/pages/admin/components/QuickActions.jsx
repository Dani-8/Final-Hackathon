import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Shield, ArrowRight, Wrench } from 'lucide-react';

export function QuickActions() {
    return (
        <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-display font-semibold text-slate-800 text-lg mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                    <Link
                        to="/admin/assets/new"
                        className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
                                <Package className="w-5 h-5" />
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-800">Register New Asset</h4>
                                <p className="text-[11px] text-slate-500">Add property, trigger QR generation.</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <Link
                        to="/admin/assets"
                        className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
                                <Shield className="w-5 h-5" />
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-800">Review Asset Inventory</h4>
                                <p className="text-[11px] text-slate-500">Manage tags, view operational logs.</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                </div>
            </div>


            <div className="bg-indigo-950 text-indigo-100 rounded-xl p-6 shadow-md relative overflow-hidden">
                <div className="relative z-10">
                    <span className="text-[9px] uppercase font-mono tracking-widest bg-indigo-800 text-indigo-200 px-2 py-0.5 rounded">Platform Tip</span>

                    <h3 className="font-display font-semibold text-white text-lg mt-3 mb-1">Print Bulk QR Labels</h3>

                    <p className="text-xs text-indigo-200 leading-relaxed mb-4">
                        You can select multiple assets from the Assets inventory list and trigger bulk QR layout rendering for physical labels printing.
                    </p>

                    <Link to="/admin/assets" className="inline-flex items-center gap-1 text-xs text-white font-bold hover:underline">
                        <span>Navigate to inventory</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                    <Wrench className="w-40 h-40" />
                </div>
            </div>
        </div>
    );
}
