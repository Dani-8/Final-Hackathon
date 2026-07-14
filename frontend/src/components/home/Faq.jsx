import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function Faq() {
    const faqs = [
        {
            q: "Do occupants need to download an application to report issues?",
            a: "Absolutely not. This is a core benefit of MaintainIQ. When occupants scan the secure QR tag, it opens a responsive public reporting web app directly inside their mobile browser. They can file reports, attach photos, and check repair statuses instantly."
        },
        {
            q: "How does the server-side Gemini AI triage process complaints?",
            a: "When a fault is submitted, our Node backend forwards the unstructured description (e.g. 'water leaking from pipes making the floor slippery') to Gemini AI. The model identifies the primary asset department (Plumbing, HVAC, Electrical), estimates urgency, and writes an action plan for the incoming specialist."
        },
        {
            q: "Can I print multiple QR codes at the same time?",
            a: "Yes. From the Admin Dashboard, select 'Bulk Print QR codes'. You can choose which registered devices need tags, and the system opens a print-optimized card matrix ready to feed into any standard adhesive label printer."
        },
        {
            q: "How do I test the full lifecycle inside this sandbox?",
            a: "Login to the Staff Portal using the default credentials. Register an asset in the dashboard and navigate to its custom page. Open the Public Portal, submit a dummy bug report to see the AI triage categorizing it, and then log back in as a Technician to complete the assignment and log comments."
        }
    ];

    const [openIdx, setOpenIdx] = useState(0);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header Title */}
                <div className="text-center space-y-3 mb-12">
                    <HelpCircle className="w-8 h-8 text-indigo-600 mx-auto" />
                    <h2 className="font-display font-black text-3xl text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        Everything you need to know about setting up and deploying MaintainIQ QR tags.
                    </p>
                </div>

                {/* FAQ items list */}
                <div className="space-y-4 text-left">
                    {faqs.map((item, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div
                                key={idx}
                                className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200"
                            >
                                <button
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-slate-800 hover:text-indigo-600 text-sm transition-colors cursor-pointer"
                                >
                                    <span>{item.q}</span>
                                    {isOpen ? (
                                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                                    )}
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100 bg-white font-medium">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
