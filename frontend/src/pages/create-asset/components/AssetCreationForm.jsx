import React from 'react';
import { CheckCircle2, Wrench, MapPin, Tag, Sliders } from 'lucide-react';

export function AssetCreationForm({
    name,
    setName,
    category,
    setCategory,
    location,
    setLocation,
    condition,
    setCondition,
    loading,
    error,
    handleSubmit,
    navigate,
}) {
    return (
        <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg">
            {/* Visual Header Accent */}
            <div className="bg-indigo-500 h-2 w-full" />

            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm flex items-start gap-3 shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0 font-bold">!</div>
                        <div>{error}</div>
                    </div>
                )}

                {/* Section 1: Core Specifications */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <Sliders className="w-5 h-5 text-indigo-500" />
                        <h2 className="text-md font-bold text-slate-800 uppercase tracking-wide font-display">Core Specifications</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label htmlFor="asset-name" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Asset Name <span className="text-rose-500">*</span>
                            </label>
                            <div className="mt-1.5 relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Wrench className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    id="asset-name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Centrifugal Chiller A"
                                    className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm placeholder-slate-400 font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Category Type
                            </label>
                            <div className="mt-1.5 relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Tag className="h-4 w-4 text-slate-400" />
                                </div>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-semibold text-slate-700"
                                >
                                    <option value="HVAC">HVAC</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Fire Safety">Fire Safety</option>
                                    <option value="Machinery">Machinery</option>
                                    <option value="IT Infrastructure">IT Infrastructure</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="condition" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Condition Grade
                            </label>
                            <select
                                id="condition"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className="mt-1.5 block w-full px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-semibold text-slate-700"
                            >
                                <option value="New">New</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                                <option value="Damaged">Damaged</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="location" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Installation Location <span className="text-rose-500">*</span>
                            </label>
                            <div className="mt-1.5 relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    id="location"
                                    type="text"
                                    required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g. Basement Mech Room B, Block 4"
                                    className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm placeholder-slate-400 font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="border-t border-slate-100 pt-6 flex justify-end gap-3">
                    <button
                        id="cancel-asset-creation-btn"
                        type="button"
                        onClick={() => navigate('/admin/assets')}
                        className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-all shadow-sm hover:border-slate-300 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        id="save-new-asset-btn"
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{loading ? 'Registering...' : 'Register Asset'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
