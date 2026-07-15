import React from 'react';
import { User, Clock } from 'lucide-react';
import { IssueStatusBadge } from '../../../components/StatusBadge.jsx';
import { formatDateTime } from '../../../utils/formatDate.js';

export function LookupResult({ issue }) {
    // Status mapping for visual tracker/stepper
    const steps = [
        { label: 'Reported', value: 'Reported' },
        { label: 'Assigned', value: 'Assigned' },
        { label: 'In Inspection', value: 'Inspection Started' },
        { label: 'In Maintenance', value: 'Maintenance In Progress' },
        { label: 'Resolved', value: 'Resolved' }
    ];

    const getStepIndex = (currentStatus) => {
        if (currentStatus === 'Closed') return 4;
        return steps.findIndex(s => s.value === currentStatus);
    };

    const currentStepIdx = issue ? getStepIndex(issue.status) : -1;

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-6 p-6">
            {/* Top header stats */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Active Ticket</span>
                    <h3 className="font-mono font-bold text-lg text-slate-800">{issue.issueNumber}</h3>
                </div>
                <IssueStatusBadge status={issue.status} />
            </div>

            {/* Stepper progress tracker */}
            <div className="pt-2">
                <div className="flex items-center justify-between">
                    {steps.map((step, idx) => {
                        const isCompleted = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        return (
                            <div key={idx} className="flex flex-col items-center flex-1 relative">
                                {/* Visual dot */}
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${isCompleted
                                            ? 'bg-indigo-600 border-indigo-600 text-white'
                                            : 'bg-white border-slate-200 text-slate-400'
                                        } ${isCurrent ? 'ring-4 ring-indigo-500/25 scale-110' : ''}`}
                                >
                                    {idx + 1}
                                </div>

                                <span
                                    className={`text-[10px] text-center font-medium mt-2 max-w-[80px] leading-tight ${isCompleted ? 'text-slate-800 font-semibold' : 'text-slate-400'
                                        }`}
                                >
                                    {step.label}
                                </span>

                                {/* Connecting line (except last element) */}
                                {idx < steps.length - 1 && (
                                    <div
                                        className={`absolute left-[55%] top-3.5 right-[-45%] h-0.5 z-0 ${idx < currentStepIdx ? 'bg-indigo-500' : 'bg-slate-100'
                                            }`}
                                    ></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Ticket Details */}
            <div className="border-t border-slate-100 pt-6 space-y-5">
                <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Issue reported</h4>
                    <p className="text-md font-bold text-slate-800">{issue.title}</p>
                    <p className="text-sm text-slate-600 mt-1.5 bg-slate-50 border border-slate-100 rounded-lg p-3 leading-relaxed">
                        "{issue.description}"
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Asset Location</h4>
                        <p className="text-xs font-bold text-slate-700">{issue.asset?.location || 'Unknown'}</p>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Last Update Logged</h4>
                        <p className="text-xs font-bold text-slate-700">{formatDateTime(issue.updatedAt)}</p>
                    </div>
                </div>

                {/* Technician Profile Card if assigned */}
                {issue.assignedTechnician ? (
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="bg-indigo-100 text-indigo-700 p-2.5 rounded-full">
                            <User className="w-5 h-5" />
                        </div>
                        
                        <div>
                            <p className="text-[10px] text-indigo-600 uppercase font-mono tracking-wider font-semibold">Dispatched Specialist</p>
                            <p className="text-sm font-bold text-slate-800">{issue.assignedTechnician.name}</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-2.5">
                        <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                            <h4 className="text-xs font-bold text-amber-900">Awaiting technician assignment</h4>
                            <p className="text-[11px] text-amber-700 mt-0.5">The issue was analyzed. An admin dispatcher is assigning a specialist member.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
