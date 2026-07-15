import React from 'react';
import { ShieldCheck, Trash2, Camera } from 'lucide-react';

export function RepairReportForm({
    actionTaken,
    setActionTaken,
    partsCost,
    setPartsCost,
    hoursSpent,
    setHoursSpent,
    postMaintenanceAssetStatus,
    setPostMaintenanceAssetStatus,
    afterPhotoUrl,
    setAfterPhotoUrl,
    uploadLoading,
    submitLoading,
    handlePhotoUpload,
    handleSubmitReport,
}) {
    return (
        <form onSubmit={handleSubmitReport} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">Submit Repair Report</h3>

            <div>
                <label htmlFor="action-taken" className="block text-sm font-semibold text-slate-700">Action Taken / Diagnostics Summary</label>
                <p className="text-xs text-slate-500 mt-0.5 mb-2">Write down the diagnostics discovered, components replaced, or repairs finalized.</p>
                <textarea
                    id="action-taken"
                    required
                    rows={4}
                    value={actionTaken}
                    onChange={(e) => setActionTaken(e.target.value)}
                    placeholder="e.g. Conducted safety diagnostics on fan power leads. Discovered high friction due to dried bearings. Disassembled fan block, polished shafts, installed brand-new seals, lubricated with high-grade thermal grease. Reassembled and tested. Chiller running smooth at nominal RPM."
                    className="block w-full px-3.5 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm leading-relaxed"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="parts-cost" className="block text-sm font-semibold text-slate-700">Spares/Parts Cost ($)</label>
                    <input
                        id="parts-cost"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={partsCost}
                        onChange={(e) => setPartsCost(e.target.value)}
                        className="mt-1.5 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="hours-spent" className="block text-sm font-semibold text-slate-700">Labor Hours spent</label>
                    <input
                        id="hours-spent"
                        type="number"
                        step="0.1"
                        min="0.1"
                        required
                        value={hoursSpent}
                        onChange={(e) => setHoursSpent(e.target.value)}
                        className="mt-1.5 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="post-status" className="block text-sm font-semibold text-slate-700">Target Asset Final Status</label>
                    <select
                        id="post-status"
                        value={postMaintenanceAssetStatus}
                        onChange={(e) => setPostMaintenanceAssetStatus(e.target.value)}
                        className="mt-1.5 block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm font-medium text-slate-700"
                    >
                        <option value="Operational">Operational</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Out of Service">Out of Service</option>
                    </select>
                </div>


                {/* Evidence Upload After repair */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700">Verification Photo</label>
                    <div className="mt-2 flex items-center gap-3">
                        {afterPhotoUrl ? (
                            <div className="relative w-20 h-20 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shadow-inner group">
                                <img src={afterPhotoUrl} alt="After maintenance" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                <button
                                    type="button"
                                    onClick={() => setAfterPhotoUrl('')}
                                    className="absolute top-1 right-1 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                                <Camera className="w-4 h-4 text-indigo-500" />
                                <span>Upload photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    {uploadLoading && (
                        <p className="text-[11px] text-indigo-600 mt-1 animate-pulse">Uploading photo...</p>
                    )}
                </div>
            </div>


            <div className="border-t border-slate-100 pt-6 flex justify-end">
                <button
                    id="submit-maintenance-log-btn"
                    type="submit"
                    disabled={submitLoading || uploadLoading}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{submitLoading ? 'Submitting Log...' : 'Confirm Diagnostics & Resolve Ticket'}</span>
                </button>
            </div>
        </form>
    );
}
