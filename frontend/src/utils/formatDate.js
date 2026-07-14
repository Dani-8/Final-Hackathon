export function formatDate(dateString) {
    if (!dateString) return 'Never';

    try {
        const d = new Date(dateString);

        if (isNaN(d.getTime())) return 'Never';

        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (err) {
        return 'Never';
    }
}


export function formatDateTime(dateString) {
    if (!dateString) return 'N/A';

    try {
        const d = new Date(dateString);

        if (isNaN(d.getTime())) return 'N/A';

        return d.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (err) {
        return 'N/A';
    }
}
