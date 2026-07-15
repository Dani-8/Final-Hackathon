import React from 'react';
import { useAdminDashboardData } from './hooks/useAdminDashboardData.js';
import { StatsCards } from './components/StatsCards.jsx';
import { DashboardCharts } from './components/DashboardCharts.jsx';
import { RecentIssuesTable } from './components/RecentIssuesTable.jsx';
import { QuickActions } from './components/QuickActions.jsx';


export function AdminDashboard() {
    const { issues, loading, error, stats, charts } = useAdminDashboardData();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div id="admin-dashboard-root">
            {/* Header section */}
            <div className="mb-8">
                <h1 className="font-display font-extrabold text-3xl text-slate-900">Workspace Overview</h1>
                <p className="text-sm text-slate-500">Live monitoring of facility assets, reported incidents, and technician dispatch logs.</p>
            </div>


            {error && (
                <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}


            {/* Stats Cards Section */}
            <StatsCards stats={stats} />


            {/* Analytics & Insight Charts */}
            <DashboardCharts charts={charts} />


            {/* Data split grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column: Recent Issues */}
                <div className="lg:col-span-2">
                    <RecentIssuesTable issues={issues} />
                </div>

                {/* Right column: Action Shortcuts */}
                <div>
                    <QuickActions />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
