import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Search, Shield, CheckCircle, Play, CheckCircle2 } from 'lucide-react';

export function Hero() {
    const navigate = useNavigate();
    const [quickCode, setQuickCode] = useState('');

    const handleQuickLookup = (e) => {
        e.preventDefault();
        if (quickCode.trim()) {
            navigate(`/public/lookup?code=${encodeURIComponent(quickCode.trim())}`);
        } else {
            navigate('/public/lookup');
        }
    };

    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-100">
            {/* Decorative ambient background glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[5%] w-[350px] h-[350px] bg-indigo-200/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] bg-sky-200/25 rounded-full blur-[140px]" />
            </div>


            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left: Heading and CTAs */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 px-3.5 py-1.5 rounded-full">
                            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                            <span className="text-[11px] font-bold text-indigo-700 tracking-wider uppercase">Next-Gen Asset Infrastructure</span>
                        </div>

                        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.08] lg:max-w-xl">
                            Instant Maintenance <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Fueled by QR</span> & Smart AI.
                        </h1>

                        <p className="text-base text-slate-500 font-medium leading-relaxed max-w-lg">
                            Bridge the gap between property hardware and on-site repair dispatching. Tag assets with unique secure QR codes, automate priority assessment via Gemini AI, and track tickets to resolution seamlessly.
                        </p>

                        {/* Quick Action Lookup Box */}
                        <form onSubmit={handleQuickLookup} className="max-w-md bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                            <div className="flex-1 flex items-center gap-2 pl-3">
                                <Search className="w-4 h-4 text-slate-400 shrink-0" />

                                <input
                                    type="text"
                                    placeholder="Scan or enter Asset Code (e.g. AC-101)..."
                                    value={quickCode}
                                    onChange={(e) => setQuickCode(e.target.value)}
                                    className="w-full text-sm outline-none text-slate-700 bg-transparent placeholder-slate-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1 shrink-0 uppercase tracking-wider cursor-pointer"
                            >
                                <span>Find</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </form>

                        {/* Platform Entry Hub buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                to="/public/lookup"
                                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer uppercase tracking-wider"
                            >
                                <span>Launch Service Portal</span>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-5 py-3 rounded-xl border border-indigo-100/60 transition-all cursor-pointer uppercase tracking-wider"
                            >
                                <Shield className="w-4 h-4 shrink-0" />
                                <span>Access Staff Console</span>
                            </Link>
                        </div>

                        {/* Social / Feature Proofing */}
                        <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 max-w-md">
                            <div>
                                <p className="text-xl font-extrabold text-slate-900 font-display">99.4%</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Triage Accuracy</p>
                            </div>
                            <div>
                                <p className="text-xl font-extrabold text-slate-900 font-display">&lt; 14m</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Average Dispatch</p>
                            </div>
                            <div>
                                <p className="text-xl font-extrabold text-slate-900 font-display">10k+</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assets Labeled</p>
                            </div>
                        </div>

                    </div>


                    {/* Right: Isometric mockups & visual representation */}
                    <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
                        <div className="relative w-full max-w-[420px] bg-slate-50 border border-slate-200/60 p-4 rounded-3xl shadow-lg">
                            {/* Decorative tags */}
                            <div className="absolute top-4 -left-10 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-md flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
                                    <CheckCircle className="w-5 h-5" />
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-800">AC-204 Calibrated</h4>
                                    <p className="text-[10px] text-slate-400">Checked 4m ago</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -right-6 bg-indigo-950 text-indigo-100 p-4 rounded-2xl shadow-xl max-w-[210px] space-y-1.5 border border-indigo-900 z-20">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                    <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-300">Live AI Dispatcher</span>
                                </div>

                                <p className="text-xs text-white font-medium leading-normal">
                                    "AC motor overheating. Ticket matched to HVAC Specialist Alice Smith."
                                </p>
                            </div>

                            {/* Main Illustration mockup */}
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-inner">
                                {/* Header bar */}
                                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                    </div>

                                    <span className="text-[10px] font-mono text-slate-400">maintainiq.com/tag/EL-982</span>
                                    <Shield className="w-3.5 h-3.5 text-slate-300" />
                                </div>

                                {/* Simulated Public QR Landing */}
                                <div className="p-5 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Electrical Subpanel</span>
                                            <h3 className="font-display font-extrabold text-slate-800 text-base mt-1.5">South Wing Subpanel</h3>
                                            <p className="text-[10px] text-slate-400 font-mono">Location: Corridor B, Level 2</p>
                                        </div>

                                        {/* Simulated QR Code */}
                                        <div className="border border-slate-200 p-1.5 rounded-lg bg-slate-50">
                                            <div className="w-12 h-12 bg-slate-900 rounded flex flex-col items-center justify-center p-1">
                                                {/* Grid lines mockup */}
                                                <div className="grid grid-cols-4 gap-0.5 w-full h-full opacity-90">
                                                    {[...Array(16)].map((_, i) => (
                                                        <div key={i} className={`rounded-[1px] ${i % 3 === 0 || i === 0 || i === 15 ? 'bg-white' : 'bg-transparent'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status checklist */}
                                    <div className="space-y-2 pt-2 border-t border-slate-100">
                                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <span>Regular inspections scheduled</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <span>Fault reports analyzed instantly by AI</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <span>Zero client registration required to complain</span>
                                        </div>
                                    </div>

                                    {/* Simulated Button click */}
                                    <div className="bg-indigo-600 text-white rounded-xl p-2.5 text-center text-xs font-bold shadow-md uppercase tracking-wider">
                                        Report Issue or Fault
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
