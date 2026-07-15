import React from 'react';
import { Sliders } from 'lucide-react';

export function IssueFilters({
    status,
    setStatus,
    priority,
    setPriority,
    category,
    setCategory,
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2 text-slate-500 font-medium text-xs uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Filters:</span>
            </div>
            

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                {/* Status filter */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block w-full py-2 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                >
                    <option value="">All Statuses</option>
                    <option value="Reported">Reported</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Inspection Started">Inspection Started</option>
                    <option value="Maintenance In Progress">Maintenance In Progress</option>
                    <option value="Waiting for Parts">Waiting for Parts</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                    <option value="Reopened">Reopened</option>
                </select>


                {/* Priority filter */}
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="block w-full py-2 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>


                {/* Category filter */}
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
        </div>
    );
}
