import React from 'react';
import MainLogo from '../assets/Main_LOGO2.png'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LayoutDashboard, Shield, AlertTriangle, LogOut, PlusCircle, Wrench, Menu, Users } from 'lucide-react';
// ============================================================
// ============================================================


export function AdminLayout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()

        navigate('/login')
    }

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Assets List', path: '/admin/assets', icon: Shield },
        { name: 'Register Asset', path: '/admin/assets/new', icon: PlusCircle },
        { name: 'Issues Triage', path: '/admin/issues', icon: AlertTriangle },
        { name: 'Manage Team', path: '/admin/team', icon: Users }
    ]


    return (
        <div id="admin-layout-container" className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar navigation */}
            <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col border-r border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    {/* <div className="bg-white p-2 rounded-xl"> */}
                        <img src={MainLogo} alt="MaintainIQ logo" className="w-full object-contain" />
                    {/* </div> */}
                </div>


                {/* Navigation links */}
                <nav className="flex-1 p-4 space-y-1.5">
                    {navItems.map(item => {
                        const isActive = location.pathname === item.path
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>


                {/* Enhanced User Context Profile Card & Logout at the bottom */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/45">
                    <div className="flex items-center gap-3 p-2 bg-slate-900/60 rounded-xl border border-slate-800 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-display font-bold text-xs border border-indigo-500/20 shadow-inner shrink-0">
                            {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AD'}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-200 truncate leading-snug">{user?.name || 'System Admin'}</p>
                            <p className="text-[10px] text-indigo-400 font-mono tracking-wider uppercase font-semibold mt-0.5 leading-none">Admin console</p>
                        </div>
                    </div>


                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/10 transition-all cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>


            {/* Main content body */}
            <main className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
export default AdminLayout;
