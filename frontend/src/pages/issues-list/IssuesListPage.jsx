import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useIssuesList } from './hooks/useIssuesList.js';
import { IssueFilters } from './components/IssueFilters.jsx';
import { IssueTable } from './components/IssueTable.jsx';
import { IssueAssignmentModal } from './components/IssueAssignmentModal.jsx';

export function IssuesListPage() {
    const {
        issues,
        allIssues,
        technicians,
        categories,
        loading,
        error,
        status,
        setStatus,
        priority,
        setPriority,
        category,
        setCategory,
        assigningIssue,
        setAssigningIssue,
        selectedTechId,
        setSelectedTechId,
        assignLoading,
        handleAssign,
    } = useIssuesList();

    return (
        <div id="issues-list-page-root">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="font-display font-extrabold text-3xl text-slate-900">Issues Triage Hub</h1>
                <p className="text-sm text-slate-500">Monitor active user complaints, evaluate AI priority recommendations, and dispatch technicians.</p>
            </div>

            {error && (
                <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Filter panel */}
            <IssueFilters
                status={status}
                setStatus={setStatus}
                priority={priority}
                setPriority={setPriority}
                category={category}
                setCategory={setCategory}
                categories={categories}
            />

            {/* Issues Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : issues.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
                    <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-semibold text-lg">No tickets reported</p>
                    <p className="text-slate-400 text-sm mt-1">All systems clear. Check your filter criteria or enjoy the quiet!</p>
                </div>
            ) : (
                <IssueTable
                    issues={issues}
                    setAssigningIssue={setAssigningIssue}
                />
            )}

            {/* Assignment Modal Popup */}
            {assigningIssue && (
                <IssueAssignmentModal
                    assigningIssue={assigningIssue}
                    setAssigningIssue={setAssigningIssue}
                    selectedTechId={selectedTechId}
                    setSelectedTechId={setSelectedTechId}
                    technicians={technicians}
                    allIssues={allIssues}
                    assignLoading={assignLoading}
                    handleAssign={handleAssign}
                />
            )}
        </div>
    );
}

export default IssuesListPage;
