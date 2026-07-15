import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function ReportSuccess({ successResult, slug }) {
    return (
        <div id="report-success-container" className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 text-center shadow-sm max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
            </div>

            <div>
                <h2 className="font-display font-extrabold text-2xl text-slate-900">Issue Logged Successfully</h2>
                <p className="text-sm text-slate-500 mt-1">Thank you for reporting this. A facility technician is being dispatched.</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 font-mono text-center space-y-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Your Tracking Reference</p>
                <p className="text-2xl font-extrabold text-indigo-600 tracking-tight" id="success-issue-number">
                    {successResult.issueNumber}
                </p>
                <p className="text-[10px] text-slate-500 leading-normal px-4">
                    Keep this tracking number handy to look up live technician dispatch updates.
                </p>
            </div>

            <div className="pt-6 flex flex-col gap-3">
                <Link
                    to={`/public/lookup?num=${successResult.issueNumber}`}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                    Track Dispatch Progress
                </Link>
                
                <Link
                    to={`/public/assets/${slug}`}
                    className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
                >
                    Return to Asset specifications
                </Link>
            </div>
        </div>
    );
}
