import React from 'react';
import { Sparkles } from 'lucide-react';

export function TriageForm({
    complaint,
    setComplaint,
    triageLoading,
    handleAiTriage,
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <div>
                <label htmlFor="complaint-textarea" className="block text-sm font-bold text-slate-800">What is the issue or damage?</label>
                <p className="text-xs text-slate-500 mt-0.5 mb-3">Describe the malfunction clearly in your own words. Our AI model will categorize and prioritize it.</p>
                <textarea
                    id="complaint-textarea"
                    required
                    rows={4}
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="e.g. The cooling tower on the roof is leaking water heavily from the bottom pipe. The warning buzzer is flashing red and it makes a loud squeaking sound."
                    className="block w-full px-3.5 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm leading-relaxed"
                />
            </div>

            <button
                id="ai-triage-submit-btn"
                type="button"
                disabled={triageLoading || complaint.trim().length < 5}
                onClick={handleAiTriage}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold shadow-md transition-colors cursor-pointer"
            >
                {triageLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>AI Triage analyzing complaint...</span>
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                        <span>Trigger AI Issue Triage</span>
                    </>
                )}
            </button>
        </div>
    );
}
