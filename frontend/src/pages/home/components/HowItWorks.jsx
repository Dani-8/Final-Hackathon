import React from 'react';
import { Tag, Sparkles, CheckSquare, Search, Printer, ShieldCheck } from 'lucide-react';


export function HowItWorks() {
    const steps = [
        {
            num: "01",
            icon: <Printer className="w-6 h-6 text-indigo-600" />,
            title: "Register & Print Codes",
            desc: "Register electrical, mechanical, or IT assets in the Admin Dashboard. Print secure high-resolution QR tags in bulk and stick them to the equipment."
        },
        {
            num: "02",
            icon: <Sparkles className="w-6 h-6 text-amber-600" />,
            title: "Scan & AI Triage",
            desc: "A supervisor or occupant scans the QR code. They report issues without needing an account. Our backend invokes Gemini AI to auto-assess the hazard level."
        },
        {
            num: "03",
            icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
            title: "Dispatch & Solve",
            desc: "Licensed plumbers, electricians, or technicians receive automatic dispatches on their dashboard. They perform work, add photos, and mark issues resolved."
        }
    ]


    return (
        <section className="py-20 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Title header */}
                <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">How It Works</span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                        Deploy in minutes. Fix in seconds.
                    </h2>

                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        A frictionless dispatch engine that doesn't require occupants to download any apps or set up complex usernames.
                    </p>
                </div>


                {/* Steps display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto relative">
                    {/* Connector line for desktop */}
                    <div className="hidden md:block absolute top-[28%] left-[15%] right-[15%] h-0.5 bg-slate-100 z-0" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4">
                            {/* Icon blob */}
                            <div className="relative">
                                <span className="absolute -top-3 -right-3 text-[10px] font-black font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                                    {step.num}
                                </span>

                                <div className="w-16 h-16 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-sm">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Text content */}
                            <div className="space-y-2">
                                <h3 className="font-display font-bold text-slate-800 text-lg">
                                    {step.title}
                                </h3>

                                <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-xs mx-auto">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
