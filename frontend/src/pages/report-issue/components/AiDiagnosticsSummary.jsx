import React from 'react';
import { Sparkles, ShieldAlert } from 'lucide-react';

export function AiDiagnosticsSummary({ triageResult }) {
    return (
        <div className="bg-indigo-950 text-indigo-100 border border-indigo-900 rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span className="font-display font-semibold text-white">AI Diagnostics Summary</span>
                </div>

                {/* Recurring Pattern Warning if active */}
                {triageResult.recurringPatternWarning && (
                    <div className="bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs p-3.5 rounded-xl flex gap-3">
                        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <span>{triageResult.recurringPatternWarning}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                    <div>
                        <h4 className="text-[10px] uppercase tracking-wider font-mono text-indigo-300">Suggested Causes</h4>
                        <ul className="list-disc list-inside text-xs space-y-1 mt-2 text-indigo-200">
                            {triageResult.possibleCauses.map((cause, idx) => (
                                <li key={idx}>{cause}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-wider font-mono text-indigo-300">Initial Safe Inspections</h4>
                        <ul className="list-disc list-inside text-xs space-y-1 mt-2 text-indigo-200 font-medium">
                            {triageResult.initialChecks.map((check, idx) => (
                                <li key={idx} className="text-amber-100">{check}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            
            <div className="absolute right-[-10px] top-[-10px] opacity-10">
                <Sparkles className="w-32 h-32 text-indigo-500" />
            </div>
        </div>
    );
}
