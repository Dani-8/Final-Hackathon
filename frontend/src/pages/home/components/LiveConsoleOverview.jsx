import React, { useState } from 'react';
import { Sparkles, Shield, Wrench, Flame, AlertCircle, Clock, UserCheck, CheckSquare, Zap } from 'lucide-react';


export function LiveConsoleOverview() {
    const sampleIssues = [
        {
            title: "Main water pressure drop & valve leak",
            category: "Plumbing",
            desc: "Water is starting to puddle around the basement main. The pressure gauge dropped by 15 PSI in the last hour.",
            aiSeverity: "HIGH",
            aiSpecialist: "Plumbing (Plumber)",
            aiHazards: "Slipping hazard, flooding danger in server adjacent basement",
            aiChecklist: [
                "Shut off the main basement water valve",
                "Inspect primary pressure gasket seal",
                "Replace cracked O-ring connector",
                "Re-calibrate pressure regulator valve"
            ]
        },
        {
            title: "Server Room B thermal warning & fan noise",
            category: "Electrical / HVAC",
            desc: "AC Unit is blowing warm air. High pitch grinding noise from rack 4 auxiliary cooling systems.",
            aiSeverity: "CRITICAL",
            aiSpecialist: "HVAC Technician",
            aiHazards: "Thermal damage risk for primary switches, power cutout",
            aiChecklist: [
                "Check compressor coolant pressure",
                "Clean server intake vents & clear blockages",
                "Replace damaged fan motor bearing",
                "Run emergency thermal ventilation test"
            ]
        },
        {
            title: "Broken elevator emergency lighting backup",
            category: "Electrical",
            desc: "Ground floor lift indicator is dim. Emergency backup batteries failed during the monthly power test.",
            aiSeverity: "MEDIUM",
            aiSpecialist: "Electrical (Electrician)",
            aiHazards: "Compliance failure, dark cabin hazard during emergencies",
            aiChecklist: [
                "Measure backup battery pack cell voltages",
                "Inspect backup relay junction board",
                "Replace degraded lead-acid battery array",
                "Certify lift safety compliance log"
            ]
        }
    ]


    const [selectedIdx, setSelectedIdx] = useState(0)
    const current = sampleIssues[selectedIdx]


    return (
        <section className="py-20 bg-slate-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Title */}
                <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Live Demo Playground</span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                        See Gemini AI Triage in Action
                    </h2>

                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Click on a mock facility report below to watch how our intelligent server-side agent parses unstructured natural text into exact priority ratings and step-by-step resolution blueprints.
                    </p>
                </div>


                {/* Interactive Workspace Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">

                    {/* Left Tab selector: Unstructured Reports */}
                    <div className="lg:col-span-5 space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Unstructured Occupant Complains</h3>

                        {sampleIssues.map((issue, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedIdx(idx)}
                                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 relative overflow-hidden cursor-pointer bg-white ${selectedIdx === idx
                                        ? 'border-indigo-600 ring-2 ring-indigo-500/10 shadow-sm'
                                        : 'border-slate-200/80 hover:border-slate-300'
                                    }`}
                            >
                                {selectedIdx === idx && (
                                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600" />
                                )}
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                                            {issue.category}
                                        </span>

                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${issue.aiSeverity === 'CRITICAL' ? 'bg-rose-50 text-rose-700' :
                                                issue.aiSeverity === 'HIGH' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                                            }`}>
                                            {issue.aiSeverity}
                                        </span>
                                    </div>

                                    <h4 className="font-display font-bold text-slate-800 text-sm mt-2">{issue.title}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed italic">
                                        "{issue.desc}"
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Preview: Live AI Output Generation simulation */}
                    <div className="lg:col-span-7 bg-white border border-slate-200/85 rounded-2xl shadow-sm p-6 relative overflow-hidden flex flex-col justify-between">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 animate-pulse">
                                    <Sparkles className="w-4.5 h-4.5" />
                                </div>

                                <div>
                                    <h4 className="font-display font-extrabold text-slate-900 text-sm">MaintainIQ Gemini Triage Engine</h4>
                                    <p className="text-[10px] text-slate-400">Processed in real-time server side</p>
                                </div>
                            </div>

                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>Verified Match</span>
                            </span>
                        </div>

                        {/* AI Diagnostics details */}
                        <div className="py-5 space-y-4 flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggested Specialist</p>

                                    <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold">
                                        <UserCheck className="w-4 h-4 text-indigo-600" />
                                        <span>{current.aiSpecialist}</span>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hazard Checklist</p>

                                    <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold text-rose-700">
                                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                        <span className="truncate">{current.aiHazards}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action checklist */}
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Generated Repair Steps</p>

                                <div className="space-y-2">
                                    {current.aiChecklist.map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                                            <div className="bg-indigo-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                {idx + 1}
                                            </div>

                                            <span className="font-medium leading-normal">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* Simulated Action CTAs */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                            <span className="text-slate-400 font-medium">Want to test with custom images & real codes?</span>

                            <div className="flex gap-2">
                                <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer">
                                    Simulation Guide
                                </button>

                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm cursor-pointer">
                                    Try Demo Flows
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
