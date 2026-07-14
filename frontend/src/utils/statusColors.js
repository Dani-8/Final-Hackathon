export function getAssetStatusColor(status) {
    switch (status) {
        case 'Operational':
            return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Issue Reported':
            return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Under Inspection':
            return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'Under Maintenance':
            return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        case 'Out of Service':
            return 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
        case 'Retired':
            return 'bg-slate-100 text-slate-700 border-slate-300';
        default:
            return 'bg-slate-50 text-slate-700 border-slate-200';
    }
}


export function getIssueStatusColor(status) {
    switch (status) {
        case 'Reported':
            return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Assigned':
            return 'bg-sky-50 text-sky-700 border-sky-200';
        case 'Inspection Started':
            return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'Maintenance In Progress':
            return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        case 'Waiting for Parts':
            return 'bg-violet-50 text-violet-700 border-violet-200';
        case 'Resolved':
            return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Closed':
            return 'bg-slate-100 text-slate-600 border-slate-300';
        case 'Reopened':
            return 'bg-rose-50 text-rose-700 border-rose-200';
        default:
            return 'bg-slate-50 text-slate-700 border-slate-200';
    }
}


export function getPriorityColor(priority) {
    switch (priority?.toLowerCase()) {
        case 'low':
            return 'bg-slate-100 text-slate-700 border-slate-200';
        case 'medium':
            return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'high':
            return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'critical':
            return 'bg-rose-500 text-white border-rose-600 font-semibold animate-pulse';
        default:
            return 'bg-slate-50 text-slate-700 border-slate-200';
    }
}
