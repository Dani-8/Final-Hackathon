import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useReportIssue } from './hooks/useReportIssue.js';
import { ReportSuccess } from './components/ReportSuccess.jsx';
import { TriageForm } from './components/TriageForm.jsx';
import { AiDiagnosticsSummary } from './components/AiDiagnosticsSummary.jsx';
import { IncidentForm } from './components/IncidentForm.jsx';

export function ReportIssuePage() {
    const {
        slug,
        navigate,
        asset,
        loading,
        error,
        complaint,
        setComplaint,
        triageLoading,
        triageResult,
        setTriageResult,
        title,
        setTitle,
        category,
        setCategory,
        priority,
        setPriority,
        reporterName,
        setReporterName,
        reporterContact,
        setReporterContact,
        setAiFieldsEdited,
        evidenceFiles,
        uploadLoading,
        successResult,
        submitLoading,
        handleAiTriage,
        handleFileUpload,
        removeFile,
        handleSubmitIssue,
    } = useReportIssue();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // --- SUCCESS VIEW ---
    if (successResult) {
        return <ReportSuccess successResult={successResult} slug={slug} />;
    }

    return (
        <div id="report-issue-page-root" className="space-y-8 max-w-2xl mx-auto">
            {/* Header breadcrumb */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(`/public/assets/${slug}`)}
                    className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-800 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>

                <div>
                    <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">Report Issue / Damage</h1>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Asset Ref: {asset.assetCode} — Location: {asset.location}</p>
                </div>
            </div>

            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            {/* --- STEP 1: COMPLAINT ENTRY --- */}
            {!triageResult && (
                <TriageForm
                    complaint={complaint}
                    setComplaint={setComplaint}
                    triageLoading={triageLoading}
                    handleAiTriage={handleAiTriage}
                />
            )}

            {/* --- STEP 2: TRIAGED REPORT FORM --- */}
            {triageResult && (
                <div className="space-y-8">
                    <AiDiagnosticsSummary triageResult={triageResult} />

                    <IncidentForm
                        title={title}
                        setTitle={setTitle}
                        category={category}
                        setCategory={setCategory}
                        priority={priority}
                        setPriority={setPriority}
                        setAiFieldsEdited={setAiFieldsEdited}
                        evidenceFiles={evidenceFiles}
                        handleFileUpload={handleFileUpload}
                        removeFile={removeFile}
                        uploadLoading={uploadLoading}
                        reporterName={reporterName}
                        setReporterName={setReporterName}
                        reporterContact={reporterContact}
                        setReporterContact={setReporterContact}
                        setTriageResult={setTriageResult}
                        submitLoading={submitLoading}
                        handleSubmitIssue={handleSubmitIssue}
                    />
                </div>
            )}
        </div>
    );
}

export default ReportIssuePage;
