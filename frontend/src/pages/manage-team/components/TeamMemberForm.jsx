import React from 'react';
import { Key, RefreshCw, Loader2 } from 'lucide-react';

export function TeamMemberForm({
    editingUser,
    name,
    setName,
    email,
    setEmail,
    role,
    setRole,
    specialty,
    setSpecialty,
    password,
    setPassword,
    generateSecurePassword,
    actionLoading,
    resetForm,
    handleSubmitForm,
}) {
    return (
        <div id="team-form-container" className="bg-white border border-indigo-100 rounded-2xl shadow-sm p-6 max-w-2xl transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
            
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-slate-800 text-base">
                    {editingUser ? `Edit Team Member: ${editingUser.name}` : 'Register New Member Credentials'}
                </h2>

                {editingUser && (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
                        Updating Profile
                    </span>
                )}
            </div>


            <form onSubmit={handleSubmitForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Alice Smith"
                            className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. alice@company.com"
                            className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Workspace Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        >
                            <option value="technician">Technician</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Specialty / Dept</label>
                        {role === 'technician' ? (
                            <select
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
                                type="text"
                                disabled
                                value={role === 'admin' ? 'Administrative Support' : 'Management & Supervision'}
                                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-100 text-slate-500 cursor-not-allowed font-medium"
                            />
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                            {editingUser ? 'New Password (Optional)' : 'Temporary Password'}
                        </label>

                        {editingUser && (
                            <span className="text-[10px] text-slate-400">Leave blank to keep current password</span>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Key className="h-4 w-4 text-slate-400" />
                            </div>

                            <input
                                type="text"
                                required={!editingUser}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={editingUser ? "Enter new password if changing" : "Enter or generate temporary password"}
                                minLength={6}
                                className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={generateSecurePassword}
                            className="px-3.5 py-2 border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                            title="Generate a random safe password"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Generate</span>
                        </button>
                    </div>
                </div>


                <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={actionLoading}
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                    >
                        {actionLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                        <span>{editingUser ? 'Save Changes' : 'Register Member'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
