import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Wrench, Shield, Search, Info } from 'lucide-react'
// ============================================================
// ============================================================


export function PublicLayout() {
    return (
        <div id="public-layout-container" className="min-h-screen bg-slate-50 flex flex-col justify-between">
            {/* Top Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-sm">
                            <Wrench className="w-5 h-5" />
                        </div>

                        <div>
                            <h1 className="font-display font-bold text-lg text-slate-900 tracking-tight leading-none">MaintainIQ</h1>
                            <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500">QR Maintenance Hub</span>
                        </div>
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
                            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        >
                            <Shield className="w-3.5 h-3.5" />
                            <span>Staff Login</span>
                        </Link>
                    </nav>
                </div>
            </header>


            {/* Main Public Outlet */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12">
                <Outlet />
            </main>


            {/* Footer bar */}
            <footer className="bg-white border-t border-slate-200 py-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
                    <div className="flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-slate-300" />
                        <span>Scan QR code on any property to report faults and view live asset logs.</span>
                    </div>

                    <div>
                        <span>© 2026 MaintainIQ Inc. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default PublicLayout;
