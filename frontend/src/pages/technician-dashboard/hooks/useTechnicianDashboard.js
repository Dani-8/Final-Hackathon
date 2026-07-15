import { useState, useEffect } from 'react';
import { issueService } from '../../../services/issueService.js';
import { useAuth } from '../../../context/AuthContext.jsx';

export function useTechnicianDashboard() {
    const { user } = useAuth();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function loadAssignedIssues() {
        setLoading(true);
        try {
            // Get issues assigned specifically to this technician
            const userId = user?._id || user?.id;
            const params = { assignedTechnician: userId };
            const data = await issueService.getAll(params);
            setIssues(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch assigned issues.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const userId = user?._id || user?.id;
        if (userId) {
            loadAssignedIssues();
        } else if (user === null) {
            setLoading(false);
        }
    }, [user]);

    return {
        user,
        issues,
        loading,
        error,
        loadAssignedIssues,
    };
}
