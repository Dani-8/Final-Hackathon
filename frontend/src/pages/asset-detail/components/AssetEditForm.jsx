import React from 'react';

export function AssetEditForm({
    name,
    setName,
    location,
    setLocation,
    condition,
    setCondition,
    status,
    setStatus,
    assignedTechnician,
    setAssignedTechnician,
    lastServiceDate,
    setLastServiceDate,
    nextServiceDate,
    setNextServiceDate,
    technicians,
    editLoading,
    setIsEditing,
    handleUpdate,
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-display font-semibold text-slate-800 text-lg mb-4">Edit Specifications</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Asset Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</label>
                        <input
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Condition Grade</label>
                        <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                        >
                            <option value="New">New</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor</option>
                            <option value="Damaged">Damaged</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Tech</label>
                        <select
                            value={assignedTechnician}
                            onChange={(e) => setAssignedTechnician(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                        >
                            <option value="">No technician assigned</option>
                            {technicians.map(tech => (
                                <option key={tech._id || tech.id} value={tech._id || tech.id}>{tech.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                        >
                            <option value="Operational">Operational</option>
                            <option value="Issue Reported">Issue Reported</option>
                            <option value="Under Inspection">Under Inspection</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                            <option value="Out of Service">Out of Service</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Service Date</label>
                        <input
                            type="date"
                            value={lastServiceDate}
                            onChange={(e) => setLastServiceDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Service Date</label>
                        <input
                            type="date"
                            value={nextServiceDate}
                            onChange={(e) => setNextServiceDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-2.5 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={editLoading}
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {editLoading ? 'Saving...' : 'Save Specifications'}
                    </button>
                </div>
            </form>
        </div>
    );
}
