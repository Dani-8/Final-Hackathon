import { useState, useEffect } from 'react';
import { issueService } from '../../../services/issueService.js';
import { categoryService } from '../../../services/categoryService.js';
import { request } from '../../../services/api.js';

export function useIssuesList() {
    const [issues, setIssues] = useState([]);
    const [allIssues, setAllIssues] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filtering state
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');

    // Selected issue for assignment modal
    const [assigningIssue, setAssigningIssue] = useState(null);
    const [selectedTechId, setSelectedTechId] = useState('');
    const [assignLoading, setAssignLoading] = useState(false);

    async function loadIssues() {
        setLoading(true);
        try {
            const params = {};
            if (status) params.status = status;
            if (priority) params.priority = priority;
            if (category) params.category = category;

            const data = await issueService.getAll(params);
            setIssues(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch issues inventory.');
        } finally {
            setLoading(false);
        }
    }

    async function loadTechnicians() {
        try {
            const res = await request('/users/technicians');
            setTechnicians(res.data || []);

            const issuesRes = await issueService.getAll();
            setAllIssues(issuesRes || []);

            const categoriesRes = await categoryService.getAll();
            setCategories(categoriesRes || []);
        } catch (err) {
            console.warn('Failed to load technician list, issues or categories:', err.message);
        }
    }

    useEffect(() => {
        loadIssues();
    }, [status, priority, category]);

    useEffect(() => {
        loadTechnicians();
    }, []);

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!selectedTechId) return;

        setError('');
        setAssignLoading(true);

        try {
            await issueService.assign(assigningIssue._id, selectedTechId);
            setAssigningIssue(null);
            setSelectedTechId('');
            loadIssues();
        } catch (err) {
            setError(err.message || 'Failed to dispatch technician.');
        } finally {
            setAssignLoading(false);
        }
    };

    return {
        issues,
        allIssues,
        technicians,
        categories,
        loading,
        error,
        setError,
        status,
        setStatus,
        priority,
        setPriority,
        category,
        setCategory,
        assigningIssue,
        setAssigningIssue,
        selectedTechId,
        setSelectedTechId,
        assignLoading,
        handleAssign,
    };
}
