import React from 'react';
import MainLogo from '../../../assets/Main_LOGO2.png'
import { Link } from 'react-router-dom';
import { Wrench, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

export function LoginHero() {
    return (
        <div className="hidden lg:flex lg:w-[45%] bg-indigo-950 text-white p-12 flex-col justify-between relative overflow-hidden">
            {/* Ambient Gradient Mesh Overlays */}
            <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-sky-500/20 rounded-full blur-[140px]" />

            {/* Top Branding Header */}
            <div className="relative z-10 flex items-center gap-3">
                {/* <div className="bg-white p-2 rounded-xl"> */}
                    <img src={MainLogo} alt="MaintainIQ logo" className="w-55    object-contain" />
                {/* </div> */}
            </div>


            {/* Core Value Statement */}
            <div className="relative z-10 space-y-8 my-auto">
                <div className="space-y-4">
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
                        A modern console built for field engineering.
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium">
                        MaintainIQ streamlines inspections, manages printable secure QR codes, and uses Gemini AI to match issues to qualified plumbers, electricians, and technicians.
                    </p>
                </div>


                {/* Quick Checklist Highlights */}
                <div className="space-y-3.5">
                    {[
                        "Bulk print customizable asset labels and tags",
                        "Real-time server-side Gemini AI risk triage",
                        "Direct technician dispatching with audit history logs",
                        "Fully compliant offline safety checklist forms"
                    ].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-200">
                            <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>
            </div>


            {/* Back Link or Footer */}
            <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/5 text-xs text-slate-400">
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Homepage</span>
                </Link>
                <span>© 2026 MaintainIQ Inc.</span>
            </div>
        </div>
    );
}
