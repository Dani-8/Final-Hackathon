import React from 'react';
import { Users, Plus, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useManageTeam } from './hooks/useManageTeam.js';
import { TeamMemberForm } from './components/TeamMemberForm.jsx';
import { TeamDirectoryTable } from './components/TeamDirectoryTable.jsx';

export function ManageTeamPage() {
    const {
        currentUser, users, loading, actionLoading, error, setError, success, setSuccess,
        showForm, setShowForm, editingUser, setEditingUser,
        name, setName, email, setEmail, role, setRole, specialty, setSpecialty, password, setPassword,
        generateSecurePassword, resetForm, handleSubmitForm, handleEditClick, handleDeleteUser,
    } = useManageTeam()
    

    return (
        <div id="manage-team-root" className="space-y-6">
            {/* Upper header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-slate-200/85 rounded-2xl shadow-sm">
                <div>
                    <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight flex items-center gap-2">
                        <Users className="w-6 h-6 text-indigo-600" />
                        <span>Staff & Team Directory</span>
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">Manage team credentials, roles, and specialties for smart ticket dispatching.</p>
                </div>

                <button
                    onClick={() => {
                        if (showForm) {
                            resetForm();
                        } else {
                            setShowForm(true);
                            setEditingUser(null);
                        }
                        setError('');
                        setSuccess('');
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer shrink-0"
                >
                    {showForm && !editingUser ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    <span>{showForm && !editingUser ? 'Close Form' : editingUser ? 'Switch to Register' : 'Register New Member'}</span>
                </button>
            </div>


            {/* Global Alerts */}
            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm flex items-start gap-3 animate-fade-in">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-start gap-3 animate-fade-in">
                    <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{success}</span>
                </div>
            )}


            {/* Register/Edit user form */}
            {showForm && (
                <TeamMemberForm
                    editingUser={editingUser}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    role={role}
                    setRole={setRole}
                    specialty={specialty}
                    setSpecialty={setSpecialty}
                    password={password}
                    setPassword={setPassword}
                    generateSecurePassword={generateSecurePassword}
                    actionLoading={actionLoading}
                    resetForm={resetForm}
                    handleSubmitForm={handleSubmitForm}
                />
            )}


            {/* Directory list card */}
            <div className="bg-white border border-slate-200/95 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-4.5 h-4.5 text-indigo-500" />
                        <h2 className="font-display font-bold text-slate-800 text-sm">Active Workspace Directory</h2>
                    </div>

                    <span className="bg-indigo-50 text-indigo-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-100">
                        {users.length} {users.length === 1 ? 'member' : 'members'}
                    </span>
                </div>

                {loading ? (
                    <div className="p-16 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                        <p className="text-xs text-slate-400 font-medium">Retrieving staff listings...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-16 text-center space-y-2">
                        <Users className="w-10 h-10 text-slate-300 mx-auto" />
                        <h3 className="font-display font-bold text-slate-800 text-sm">No Members Found</h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">Click "Register New Member" above to create administrative, supervisor, or technician logs.</p>
                    </div>
                ) : (
                    <TeamDirectoryTable
                        users={users}
                        currentUser={currentUser}
                        actionLoading={actionLoading}
                        handleEditClick={handleEditClick}
                        handleDeleteUser={handleDeleteUser}
                    />
                )}
            </div>
        </div>
    );
}

export default ManageTeamPage;
