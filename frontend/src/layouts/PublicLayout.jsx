import React from 'react'
import MainLogo from '../assets/Main_LOGO.png'
import MainLogo2 from '../assets/Main_LOGO2.png'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Wrench, Shield, Search, Info } from 'lucide-react'
// ================================================================
// ================================================================

export function PublicLayout() {
    const location = useLocation()
    const isHome = location.pathname === '/'


    return (
        <div id="public-layout-container" className="min-h-screen bg-slate-50 flex flex-col justify-between">

            {/* Top Header */}
            <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        {/* <div className="p-6 border-b border-slate-800"> */}
                        <div className="">
                            <img src={MainLogo} alt="MaintainIQ logo" className="w-45 object-contain" />
                        </div>
                        {/* </div> */}
                    </Link>


                    <nav className="flex items-center gap-4">
                        <Link
                            to="/public/lookup"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                        >
                            <Search className="w-3.5 h-3.5" />
                            <span>Track Issue</span>
                        </Link>

                        <Link
                            to="/login"
                            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                            <Shield className="w-3.5 h-3.5" />
                            <span>Staff Login</span>
                        </Link>
                    </nav>
                </div>
            </header>


            {/* Main Public Outlet */}
            <main className={isHome ? "flex-1 w-full" : "flex-1 max-w-4xl w-full mx-auto p-6 md:p-12"}>
                <Outlet />
            </main>


            {/* Footer bar */}
            <footer className="bg-indigo-950 text-slate-300 border-t border-indigo-900 pt-16 pb-12 mt-30">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-indigo-900/60">

                    {/* Column 1: Brand details */}
                    <div className="md:col-span-5 space-y-4">
                        <div className="pb-6 border-b border-slate-800 w-fit">
                            {/* <div className="bg-white p-2 rounded-xl"> */}
                                <img src={MainLogo2} alt="MaintainIQ logo" className="w-55 object-contain" />
                            {/* </div> */}
                        </div>

                        <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
                            Bridge the physical-to-digital gap in property maintenance. Tag mechanical and electrical assets with secure QR codes, automate priority dispatches with Gemini AI, and track tickets to resolution seamlessly.
                        </p>

                        <div className="flex items-center gap-2 pt-2 text-[10px] bg-indigo-900/40 border border-indigo-900/80 p-2.5 rounded-lg max-w-xs text-indigo-200">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            <span className="font-semibold">Facility dispatch engines online in 4 sectors</span>
                        </div>
                    </div>

                    {/* Column 2: Platform Links */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Platform Navigation</h4>
                        
                        <ul className="space-y-2 text-xs font-semibold text-slate-300">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">Home Landing</Link>
                            </li>
                            <li>
                                <Link to="/public/lookup" className="hover:text-white transition-colors">Public Portal & Trackers</Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-white transition-colors">Staff Access Console</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Tech capabilities */}
                    <div className="md:col-span-4 space-y-3">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Capabilities</h4>
                        <ul className="space-y-2 text-xs text-slate-400 font-medium">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span>On-demand printable adhesive QR labels</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span>Gemini API server-side natural text assessment</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span>Zero registration complaints filing flow</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span>Specialist smart matches (HVAC, plumbing, electrical)</span>
                            </li>
                        </ul>
                    </div>

                </div>


                {/* Lower footer copyright */}
                <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-mono text-indigo-400">STATUS: ACTIVE</span>
                        <span className="text-slate-600">•</span>
                        <span>Scan to report any issues immediately.</span>
                    </div>

                    <div>
                        <span>© 2026 MaintainIQ Inc. All rights reserved. Built with love & AI.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default PublicLayout;
