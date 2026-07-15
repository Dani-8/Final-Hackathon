import React from 'react';
import { FileText, Wrench } from 'lucide-react';
import { useIssueStatusLookup } from './hooks/useIssueStatusLookup.js';
import { LookupForm } from './components/LookupForm.jsx';
import { LookupResult } from './components/LookupResult.jsx';

export function IssueStatusLookupPage() {
    const {
        activeTab,
        issueNumber,
        setIssueNumber,
        assetCode,
        setAssetCode,
        issue,
        loading,
        error,
        handleTabChange,
        handleSubmit,
        lookupAssetByCode,
    } = useIssueStatusLookup();

    return (
        <div id="status-lookup-page" className="max-w-xl mx-auto space-y-8">
            {/* Search Header */}
            <div className="text-center space-y-2">
                <h1 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">Service Tracker & Asset Portal</h1>
                <p className="text-sm text-slate-500">Track active technician dispatches or inspect specific asset records instantly.</p>
            </div>

            {/* Tabs Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl" id="lookup-tabs">
                <button
                    onClick={() => handleTabChange('ticket')}
                    className={`flex-1 py-2.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'ticket'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Track Maintenance Ticket</span>
                </button>
                
                <button
                    onClick={() => handleTabChange('asset')}
                    className={`flex-1 py-2.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'asset'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Look Up Asset Code</span>
                </button>
            </div>

            {/* Query Form */}
            <LookupForm
                activeTab={activeTab}
                issueNumber={issueNumber}
                setIssueNumber={setIssueNumber}
                assetCode={assetCode}
                setAssetCode={setAssetCode}
                loading={loading}
                handleSubmit={handleSubmit}
                lookupAssetByCode={lookupAssetByCode}
            />

            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            )}

            {/* Results Output */}
            {issue && <LookupResult issue={issue} />}
        </div>
    );
}

export default IssueStatusLookupPage;
