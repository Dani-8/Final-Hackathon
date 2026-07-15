import React from 'react';

export function IssueAssignmentModal({
    assigningIssue,
    setAssigningIssue,
    selectedTechId,
    setSelectedTechId,
    technicians,
    assignLoading,
    handleAssign,
}) {
    return (
        <div id="assign-tech-modal" className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full shadow-lg p-6">
                <h3 className="font-display font-bold text-slate-800 text-lg mb-2">Dispatch Maintenance</h3>
                <p className="text-xs text-slate-500 mb-4">
                    Select a qualified technician to address Issue <span className="font-bold text-slate-700 font-mono">#{assigningIssue.issueNumber}</span> on asset <span className="font-bold text-indigo-600">{assigningIssue.asset?.name}</span>.
                </p>

                <form onSubmit={handleAssign} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Technician Assignment</label>
                        <select
                            value={selectedTechId}
                            onChange={(e) => setSelectedTechId(e.target.value)}
                            required
                            className="block w-full py-2 px-3 border border-slate-300 rounded-lg bg-white text-sm"
                        >
                            <option value="">-- Choose Staff member --</option>
                            {technicians.map(tech => (
                                <option key={tech._id} value={tech._id}>{tech.name}</option>
                            ))}
                        </select>
                    </div>


                    <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setAssigningIssue(null);
                                setSelectedTechId('');
                            }}
                            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Close
                        </button>

                        <button
                            id="confirm-dispatch-btn"
                            type="submit"
                            disabled={assignLoading || !selectedTechId}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {assignLoading ? 'Dispatching...' : 'Dispatch Technician'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
