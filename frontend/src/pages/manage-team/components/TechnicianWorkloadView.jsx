import React, { useState } from 'react';
import { Calendar, User, Wrench, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

export function TechnicianWorkloadView({ users, issues }) {
    const [expandedTechId, setExpandedTechId] = useState(null);

    const technicians = users.filter(u => u.role === 'technician');

    const toggleExpand = (techId) => {
        setExpandedTechId(prev => (prev === techId ? null : techId));
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'critical': return 'bg-rose-500 text-white font-bold';
            case 'high': return 'bg-amber-500 text-white';
            case 'medium': return 'bg-indigo-500 text-white';
            default: return 'bg-slate-400 text-white';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <h2 className="font-display font-bold text-slate-900 text-lg">Technician Dispatch & Workload Metrics</h2>
            </div>

            <p className="text-xs text-slate-500 leading-normal max-w-2xl mb-4">
                Review real-time task allocations and dispatch load indicators across all facility technicians to optimize work orders.
            </p>


            {technicians.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs font-semibold">
                    No technicians registered to calculate workload.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technicians.map((tech) => {
                        const techId = tech._id || tech.id;
                        const techIssues = issues.filter(issue => {
                            const assignedId = issue.assignedTechnician?._id || issue.assignedTechnician?.id || issue.assignedTechnician;
                            return String(assignedId) === String(techId);
                        });

                        // Active issues are reported, assigned, or work-in-progress, but NOT resolved/closed
                        const activeIssues = techIssues.filter(issue => !['Resolved', 'Closed'].includes(issue.status));
                        const completedIssues = techIssues.filter(issue => ['Resolved', 'Closed'].includes(issue.status));

                        const loadCount = activeIssues.length;
                        let intensityText = '🟢 Idle - Ready';
                        let intensityClass = 'bg-emerald-50 text-emerald-800 border-emerald-200/60';
                        if (loadCount > 0 && loadCount <= 2) {
                            intensityText = '🟡 Moderate - Active';
                            intensityClass = 'bg-amber-50 text-amber-800 border-amber-200/60';
                        } else if (loadCount > 2) {
                            intensityText = '🔴 High Load - Busy';
                            intensityClass = 'bg-rose-50 text-rose-800 border-rose-200/60';
                        }

                        const isExpanded = expandedTechId === techId;

                        return (
                            <div key={techId} className="bg-white border border-slate-200/95 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                                <div>
                                    {/* Top Header Card Info */}
                                    <div className="p-5 border-b border-slate-100 bg-slate-50/40">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-display font-black flex items-center justify-center text-sm border border-indigo-100">
                                                    {tech.name ? tech.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
                                                </div>

                                                <div>
                                                    <h3 className="font-display font-extrabold text-slate-800 text-sm leading-tight">{tech.name}</h3>
                                                    <span className="text-[10px] text-indigo-600 font-mono font-bold tracking-wide uppercase">{tech.specialty || 'Generalist'}</span>
                                                </div>
                                            </div>

                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${intensityClass}`}>
                                                {intensityText}
                                            </span>
                                        </div>
                                    </div>


                                    {/* Summary counts */}
                                    <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100 py-3 bg-white text-center">
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Tickets</span>
                                            <span className="text-xl font-extrabold text-slate-800">{activeIssues.length}</span>
                                        </div>
                                        
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Completed Logs</span>
                                            <span className="text-xl font-extrabold text-slate-500">{completedIssues.length}</span>
                                        </div>
                                    </div>


                                    {/* Active Issue List Accordion toggler */}
                                    {activeIssues.length > 0 && (
                                        <div className="p-4 bg-slate-50/20">
                                            <button
                                                onClick={() => toggleExpand(techId)}
                                                className="w-full flex items-center justify-between text-xs text-slate-600 font-semibold hover:text-indigo-600 transition-colors cursor-pointer"
                                            >
                                                <span>View Assigned Tasks ({activeIssues.length})</span>
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>

                                            {isExpanded && (
                                                <div className="h-[200px] space-y-2 mt-3 animate-fade-in overflow-scroll">
                                                    {activeIssues.map((issue ) => (
                                                        <div key={issue._id || issue.id} className="bg-white border border-slate-200/80 p-3 rounded-xl shadow-xs space-y-2">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <span className="font-mono text-[9px] font-bold text-slate-400">
                                                                    #{issue.issueNumber}
                                                                </span>
                                                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase ${getPriorityColor(issue.priority)}`}>
                                                                    {issue.priority}
                                                                </span>
                                                            </div>

                                                            <p className="text-xs font-bold text-slate-700 line-clamp-1 leading-snug">
                                                                {issue.title}
                                                            </p>

                                                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                                                                <span className="text-slate-400 line-clamp-1 max-w-[120px]">
                                                                    Loc: {issue.asset?.location || 'Unknown'}
                                                                </span>

                                                                <span className="bg-indigo-50/70 border border-indigo-100/50 text-indigo-700 px-1.5 py-0.5 rounded text-[9px]">
                                                                    {issue.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeIssues.length === 0 && (
                                        <div className="p-5 text-center">
                                            <p className="text-xs text-slate-400 font-medium">No pending tickets. Free for dispatch!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
