import React from 'react';
import { useTechnicianDashboard } from './hooks/useTechnicianDashboard.js';
import { TaskHeader } from './components/TaskHeader.jsx';
import { TaskQueue } from './components/TaskQueue.jsx';

export function TechnicianDashboard() {
    const { issues, loading, error } = useTechnicianDashboard();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div id="technician-dashboard-root">
            <TaskHeader />

            {error && (
                <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            <TaskQueue issues={issues} />
        </div>
    );
}

export default TechnicianDashboard;
