import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ShieldAlert, User, CheckCircle2, Sparkles, ArrowLeft, Wrench } from 'lucide-react';

export function LoginForm({
    isSignUp,
    setIsSignUp,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    specialty,
    setSpecialty,
    error,
    setError,
    success,
    setSuccess,
    loading,
    handleSubmit,
    loadDemoCredentials,
}) {
    return (
        <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-16 bg-white relative z-10">
            {/* Mobile top logo representation */}
            <div className="lg:hidden flex flex-col items-center mb-8">
                <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-md mb-3">
                    <Wrench className="w-8 h-8" />
                </div>

                <h2 className="font-display font-black text-3xl text-slate-900 tracking-tight">MaintainIQ</h2>
                <p className="text-sm text-slate-500 font-medium">QR Maintenance & Dispatch Engine</p>
            </div>

            <div className="mx-auto w-full max-w-md">
                {/* Header instructions */}
                <div className="mb-6">
                    <h3 className="font-display font-black text-2xl text-slate-900 tracking-tight">
                        {isSignUp ? 'Create Staff Profile' : 'Staff Access Console'}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        {isSignUp ? 'Register administrative or field-specialist accounts.' : 'Enter your credentials to manage active dispatches.'}
                    </p>
                </div>
                

                {/* Auth Tab selectors */}
                <div className="flex bg-slate-100/85 p-1 rounded-xl mb-6 border border-slate-200/50">
                    <button
                        type="button"
                        onClick={() => { setIsSignUp(false); setError(''); setSuccess(''); }}
                        className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${!isSignUp
                                ? 'bg-white text-indigo-700 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        onClick={() => { setIsSignUp(true); setError(''); setSuccess(''); }}
                        className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${isSignUp
                                ? 'bg-white text-indigo-700 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Register Staff
                    </button>
                </div>

                {/* Error and Success states */}
                {error && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3 text-rose-800 text-xs mb-5 animate-fade-in">
                        <ShieldAlert className="w-4.5 h-4.5 flex-shrink-0 text-rose-600 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 text-emerald-800 text-xs mb-5 animate-fade-in">
                        <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0 text-emerald-600 mt-0.5" />
                        <span>{success}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    {isSignUp && (
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Alice Smith"
                                    className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs bg-slate-50/70 focus:bg-white transition-all font-medium"
                                />
                            </div>
                        </div>
                    )}

                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. alice@company.com"
                                className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs bg-slate-50/70 focus:bg-white transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Role & Specialty Selectors */}
                    {isSignUp && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="role" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Workspace Role</label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs bg-white font-semibold text-slate-700"
                                >
                                    <option value="technician">Technician</option>
                                    <option value="supervisor">Supervisor</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="specialty" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Specialty / Dept</label>
                                {role === 'technician' ? (
                                    <select
                                        id="specialty"
                                        value={specialty}
                                        onChange={(e) => setSpecialty(e.target.value)}
                                        className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs bg-white font-semibold text-slate-700"
                                    >
                                        <option value="General Maintenance">General Maintenance</option>
                                        <option value="Plumbing">Plumbing (Plumber)</option>
                                        <option value="Electrical">Electrical (Electrician)</option>
                                        <option value="HVAC">HVAC Technician</option>
                                        <option value="Carpentry">Carpentry / Woodwork</option>
                                        <option value="IT Support">IT & Networking</option>
                                        <option value="Janitorial">Janitorial & Sanitizing</option>
                                        <option value="Appliance Repair">Appliance Repair</option>
                                    </select>
                                ) : (
                                    <input
                                        id="specialty"
                                        type="text"
                                        disabled
                                        value={role === 'admin' ? 'Administrative Support' : 'Management & Supervision'}
                                        className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-100 text-slate-500 cursor-not-allowed font-medium"
                                    />
                                )}
                            </div>
                        </div>
                    )}


                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-slate-400" />
                            </div>

                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min 6 characters"
                                minLength={6}
                                className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs bg-slate-50/70 focus:bg-white transition-all font-medium"
                            />
                        </div>
                    </div>


                    {/* Submit Action */}
                    <button
                        id="submit-login-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 disabled:opacity-50 transition-colors cursor-pointer uppercase tracking-wider shadow-sm hover:shadow"
                    >
                        {loading ? 'Verifying...' : isSignUp ? 'Register & Access Console' : 'Sign In To Console'}
                    </button>
                </form>


                {/* Demo Evaluation Credentials */}
                {!isSignUp && (
                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demo Evaluation Credentials</h4>

                            <span className="text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-500" />
                                <span>1-Click Fill</span>
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                id="load-demo-admin-btn"
                                onClick={() => loadDemoCredentials('admin')}
                                className="flex flex-col items-start p-3 border border-slate-200 hover:border-indigo-500/40 rounded-xl hover:bg-indigo-50/30 transition-colors text-left cursor-pointer"
                            >
                                <span className="text-xs font-bold text-slate-800">System Admin</span>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">admin@maintainiq.com</span>
                            </button>

                            <button
                                id="load-demo-tech-btn"
                                onClick={() => loadDemoCredentials('tech')}
                                className="flex flex-col items-start p-3 border border-slate-200 hover:border-indigo-500/40 rounded-xl hover:bg-indigo-50/30 transition-colors text-left cursor-pointer"
                            >
                                <span className="text-xs font-bold text-slate-800">Technician</span>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">tech@maintainiq.com</span>
                            </button>
                        </div>
                    </div>
                )}


                {/* Mobile Back navigation */}
                <div className="lg:hidden mt-6 text-center">
                    <Link to="/" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Homepage</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
