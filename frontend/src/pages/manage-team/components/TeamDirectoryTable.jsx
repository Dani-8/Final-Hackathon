import React from 'react';
import { Mail, Shield, Users, User, Edit2, Trash2 } from 'lucide-react';
import { formatDate } from '../../../utils/formatDate.js';

export function TeamDirectoryTable({
    users, currentUser, actionLoading, handleEditClick, handleDeleteUser,
}) {
    const getRoleBadge = (userRole) => {
        switch (userRole) {
            case 'admin':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/50">
                        <Shield className="w-3 h-3" />
                        <span>Admin</span>
                    </span>
                );
            case 'supervisor':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/50">
                        <Users className="w-3 h-3" />
                        <span>Supervisor</span>
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                        <User className="w-3 h-3" />
                        <span>Technician</span>
                    </span>
                );
        }
    }


    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/30 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                        <th className="px-6 py-3.5">Name</th>
                        <th className="px-6 py-3.5">Email Address</th>
                        <th className="px-6 py-3.5">System Role</th>
                        <th className="px-6 py-3.5">Specialty / Department</th>
                        <th className="px-6 py-3.5">Date Registered</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                    {users.map((item) => {
                        const isSelf = String(item._id || item.id) === String(currentUser?.id || currentUser?._id);
                        return (
                            <tr key={item._id || item.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-display font-bold flex items-center justify-center text-xs border border-indigo-100">
                                            {item.name ? item.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-slate-800">
                                                {item.name} {isSelf && <span className="ml-1 text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/50">(You)</span>}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span>{item.email}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    {getRoleBadge(item.role)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-slate-700 font-medium bg-slate-100/70 border border-slate-200/50 px-2.5 py-1 rounded-md text-[11px]">
                                        {item.specialty || (item.role === 'admin' ? 'Administrative Support' : 'General Maintenance')}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-slate-500">
                                    {item.createdAt ? formatDate(item.createdAt) : 'N/A'}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="inline-flex items-center gap-1.5">
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            disabled={actionLoading}
                                            title="Edit details"
                                            className="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteUser(item._id || item.id, item.name)}
                                            disabled={isSelf || actionLoading}
                                            title={isSelf ? 'You cannot remove yourself' : 'Remove staff member'}
                                            className={`p-1.5 rounded-lg transition-colors ${isSelf
                                                ? 'text-slate-200 cursor-not-allowed'
                                                : 'text-rose-500 hover:bg-rose-50 hover:text-rose-600 cursor-pointer'
                                                }`}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
