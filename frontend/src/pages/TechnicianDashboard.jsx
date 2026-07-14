import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { issueService } from '../services/issueService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { AlertTriangle, Wrench, Shield } from 'lucide-react';
import { IssueStatusBadge, PriorityBadge } from '../components/StatusBadge.jsx';
import { formatDate } from '../utils/formatDate.js';
// ---------------------------------------------------------------------

export function TechnicianDashboard() {
    const { user } = useAuth()
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    async function loadAssignedIssues() {
        setLoading(true)

        try {
            // Get issues assigned specifically to this technician
            const params = { assignedTechnician: user?._id };
            const data = await issueService.getAll(params)

            setIssues(data)
        } catch (err) {
            setError(err.message || 'Failed to fetch assigned issues.');
        } finally {
            setLoading(false);
        }
    }
    // -----------------------------------------

    useEffect(() => {
        if (user?._id) {
            loadAssignedIssues()
        }
    }, [user])


    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        )
    }


    return (
        <div id="technician-dashboard-root">
            {/* Header section */}
            <div className="mb-8">
                <h1 className="font-display font-extrabold text-3xl text-slate-900">Assigned Tasks Desk</h1>
                <p className="text-sm text-slate-500">View and update dispatch tasks, inspect faulty properties, and log completed maintenance records.</p>
            </div>

            {error && (
                <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Main tasks list */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                    <h2 className="font-display font-bold text-slate-800 text-md">My Current Queue</h2>
                </div>

                {issues.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="font-semibold text-sm">All clear! No pending dispatches assigned.</p>
                        <p className="text-xs mt-1">Excellent work keeping our facilities running smooth.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {issues.map((issue) => (
                            <div key={issue._id} className="p-6 hover:bg-slate-50/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2 max-w-xl">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                            {issue.issueNumber}
                                        </span>

                                        <PriorityBadge priority={issue.priority} />
                                        <IssueStatusBadge status={issue.status} />
                                    </div>

                                    <div>
                                        <h3 className="text-md font-bold text-slate-800 leading-tight">{issue.title}</h3>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">"{issue.description}"</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-1.5 text-xs text-slate-500 font-medium">
                                        <div>
                                            <span className="text-slate-400 font-normal">Asset node:</span> <span className="font-semibold text-slate-700">{issue.asset?.name || 'Unknown'}</span>
                                        </div>

                                        <div>
                                            <span className="text-slate-400 font-normal">Location:</span> <span className="font-semibold text-slate-700">{issue.asset?.location || 'Unknown'}</span>
                                        </div>
                                    </div>
                                </div>
                                

                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Link
                                        id={`perform-maintenance-btn-${issue.issueNumber}`}
                                        to={`/technician/issues/${issue._id}/work`}
                                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                    >
                                        <Wrench className="w-3.5 h-3.5 text-teal-400" />
                                        <span>Perform Maintenance</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default TechnicianDashboard;
