import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useIssueWork } from './hooks/useIssueWork.js';
import { IssueSpecsCard } from './components/IssueSpecsCard.jsx';
import { StatusProgressionStepper } from './components/StatusProgressionStepper.jsx';
import { RepairReportForm } from './components/RepairReportForm.jsx';
import { SafeInspectionsList } from './components/SafeInspectionsList.jsx';

export function IssueWorkPage() {
    const {
        id, navigate, issue, loading, error, status, actionTaken, setActionTaken, partsCost, setPartsCost, 
        hoursSpent, setHoursSpent, postMaintenanceAssetStatus, setPostMaintenanceAssetStatus, afterPhotoUrl, 
        setAfterPhotoUrl, uploadLoading, submitLoading, handleStatusChange, handlePhotoUpload, handleSubmitReport
    } = useIssueWork();

    
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!issue) {
        return (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-lg text-sm text-center">
                Task assignment not found.
            </div>
        );
    }

    const isResolved = ['Resolved', 'Closed'].includes(issue.status);

    return (
        <div id="issue-work-page-root" className="space-y-8 max-w-3xl mx-auto">
            {/* Header breadcrumb */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/technician')}
                    className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-800 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                    <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">Execute Dispatch Ticket</h1>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Reference ID: {issue.issueNumber} — Site: {issue.asset?.location}</p>
                </div>
            </div>

            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left main work space */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Issue specifications block */}
                    <IssueSpecsCard issue={issue} />

                    {/* Stepper workflow buttons */}
                    {!isResolved && (
                        <StatusProgressionStepper
                            status={status}
                            handleStatusChange={handleStatusChange}
                        />
                    )}

                    {/* Maintenance Final Log Submission Form */}
                    {!isResolved ? (
                        <RepairReportForm
                            actionTaken={actionTaken}
                            setActionTaken={setActionTaken}
                            partsCost={partsCost}
                            setPartsCost={setPartsCost}
                            hoursSpent={hoursSpent}
                            setHoursSpent={setHoursSpent}
                            postMaintenanceAssetStatus={postMaintenanceAssetStatus}
                            setPostMaintenanceAssetStatus={setPostMaintenanceAssetStatus}
                            afterPhotoUrl={afterPhotoUrl}
                            setAfterPhotoUrl={setAfterPhotoUrl}
                            uploadLoading={uploadLoading}
                            submitLoading={submitLoading}
                            handlePhotoUpload={handlePhotoUpload}
                            handleSubmitReport={handleSubmitReport}
                        />
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm animate-fade-in">
                            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                            <h3 className="font-display font-extrabold text-slate-800 text-lg">Incident Logged as Resolved</h3>
                            <p className="text-xs text-slate-500 mt-1 leading-normal max-w-sm mx-auto">
                                Excellent! This dispatch ticket has been closed. Thank you for completing the maintenance audit report on time.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right side helper info column */}
                <SafeInspectionsList issue={issue} />
            </div>
        </div>
    );
}

export default IssueWorkPage;
