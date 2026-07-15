import React from 'react';

export function StatusProgressionStepper({
    status,
    handleStatusChange,
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-slate-800 text-sm border-b border-slate-100 pb-2">Status Progression</h3>
            <p className="text-xs text-slate-500">Update your operational status in real-time as you inspect, repair, or wait for spares.</p>

            <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                    id="status-insp-btn"
                    onClick={() => handleStatusChange('Inspection Started')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${status === 'Inspection Started'
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                >
                    Inspection Started
                </button>

                <button
                    id="status-maint-btn"
                    onClick={() => handleStatusChange('Maintenance In Progress')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${status === 'Maintenance In Progress'
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                >
                    Maintenance In Progress
                </button>

                <button
                    id="status-parts-btn"
                    onClick={() => handleStatusChange('Waiting for Parts')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${status === 'Waiting for Parts'
                            ? 'bg-violet-600 border-violet-600 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                >
                    Waiting for Parts
                </button>
            </div>
        </div>
    );
}
