import React from 'react';
import { Search, Filter } from 'lucide-react';

export function AssetFilters({
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    showRetired,
    setShowRetired,
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    
                    <input
                        type="text"
                        placeholder="Search assets by code, name, or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                    />
                </div>


                {/* Category Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full py-2 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                    >
                        <option value="">All Categories</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Fire Safety">Fire Safety</option>
                        <option value="Machinery">Machinery</option>
                        <option value="IT Infrastructure">IT Infrastructure</option>
                    </select>
                </div>
                

                {/* Status Filter */}
                <div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full py-2 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value="Operational">Operational</option>
                        <option value="Issue Reported">Issue Reported</option>
                        <option value="Under Inspection">Under Inspection</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Out of Service">Out of Service</option>
                    </select>
                </div>
                

                {/* Include Retired Toggle */}
                <div className="flex items-center justify-start sm:justify-end gap-2.5">
                    <label className="text-xs text-slate-500 font-medium select-none" htmlFor="retired-toggle">Include Retired</label>
                    <input
                        id="retired-toggle"
                        type="checkbox"
                        checked={showRetired === 'true'}
                        onChange={(e) => setShowRetired(e.target.checked ? 'true' : 'false')}
                        className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
}
