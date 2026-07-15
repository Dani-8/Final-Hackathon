import React from 'react'
import { QrCode, Sparkles, Shield, Clock, Eye, AlertCircle, ArrowRight } from 'lucide-react'

export function Features() {
    const list = [
        {
            icon: <QrCode className="w-5 h-5 text-indigo-600" />,
            tag: "QR Code Dispatch",
            title: "Printable Facility Tags",
            desc: "Assign physical labels to generators, water mains, and server racks. Scan to read the full lifecycle of inspections instantly.",
            badge: "Plug & Play",
            color: "bg-indigo-50 border-indigo-100"
        },
        {
            icon: <Sparkles className="w-5 h-5 text-amber-600" />,
            tag: "AI Risk Analysis",
            title: "Gemini Triage Triage",
            desc: "Unstructured complaints are parsed with Gemini AI. Automatically determines urgency levels, lists key problems, and flags hazards.",
            badge: "Real-time AI",
            color: "bg-amber-50 border-amber-100"
        },
        {
            icon: <Shield className="w-5 h-5 text-emerald-600" />,
            tag: "Specialty Dispatch",
            title: "Expert Routing",
            desc: "Matches faults to registered specialists based on departments (HVAC, Electrical, Plumbing, IT support) with zero manual delay.",
            badge: "Smart Match",
            color: "bg-emerald-50 border-emerald-100"
        },
        {
            icon: <Clock className="w-5 h-5 text-sky-600" />,
            tag: "Historical Trail",
            title: "Immutable Logs",
            desc: "Keep records of all maintenance work, comments, before/after images, and signatures. Excellent for regulatory safety checks.",
            badge: "Audit Proof",
            color: "bg-sky-50 border-sky-100"
        }
    ];

    return (
        <section className="py-20 bg-slate-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header content */}
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Core Features</span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                        Designed for Facility Managers & Field Technicians
                    </h2>

                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Eliminate phone chains and messy spreadsheets. MaintainIQ manages your entire asset network with modern, structured mobile workflows.
                    </p>
                </div>

                {/* Features Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between group"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className={`p-2.5 rounded-xl ${item.color} border shrink-0`}>
                                        {item.icon}
                                    </div>
                                    
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                        {item.badge}
                                    </span>
                                </div>


                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.tag}</span>
                                    <h3 className="font-display font-extrabold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>


                            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
                                <span>Learn more</span>
                                <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
