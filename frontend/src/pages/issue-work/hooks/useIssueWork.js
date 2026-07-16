import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { issueService } from '../../../services/issueService.js';
import { uploadRequest } from '../../../services/api.js';

export function useIssueWork() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Maintenance form inputs
    const [status, setStatus] = useState('');
    const [actionTaken, setActionTaken] = useState('');
    const [partsCost, setPartsCost] = useState('0');
    const [hoursSpent, setHoursSpent] = useState('1');
    const [postMaintenanceAssetStatus, setPostMaintenanceAssetStatus] = useState('Operational');

    // Evidence file upload after maintenance
    const [afterPhotoUrl, setAfterPhotoUrl] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    async function loadIssueDetails() {
        setLoading(true);
        try {
            const data = await issueService.getById(id);
            setIssue(data);
            setStatus(data.status);
            setPostMaintenanceAssetStatus(data.asset?.status || 'Operational');
        } catch (err) {
            setError(err.message || 'Failed to load task details.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadIssueDetails();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        setError('');
        try {
            await issueService.updateStatus(id, newStatus);
            setStatus(newStatus);
            const updated = await issueService.getById(id);
            setIssue(updated);
        } catch (err) {
            setError(err.message || 'Failed to update issue status.');
        }
    };

    const handleCheckToggle = async (checkString) => {
        if (!issue) return;
        const currentCompleted = issue.completedChecks || [];
        let updatedCompleted;
        if (currentCompleted.includes(checkString)) {
            updatedCompleted = currentCompleted.filter(c => c !== checkString);
        } else {
            updatedCompleted = [...currentCompleted, checkString];
        }

        try {
            setIssue(prev => ({
                ...prev,
                completedChecks: updatedCompleted
            }));
            await issueService.updateChecks(id, updatedCompleted);
        } catch (err) {
            setError(err.message || 'Failed to update checklist item.');
            setIssue(prev => ({
                ...prev,
                completedChecks: currentCompleted
            }));
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('evidence', file);

            const res = await uploadRequest('/uploads/evidence', formData);
            if (res.success && res.data.url) {
                setAfterPhotoUrl(res.data.url);
            }
        } catch (err) {
            setError(err.message || 'Photo upload failed.');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleSubmitReport = async (e) => {
        e.preventDefault();
        if (!actionTaken || actionTaken.trim().length < 5) {
            alert('Please describe the action taken in more detail.');
            return;
        }

        setError('');
        setSubmitLoading(true);

        try {
            await issueService.submitMaintenance(id, {
                actionTaken,
                partsCost: parseFloat(partsCost) || 0,
                hoursSpent: parseFloat(hoursSpent) || 0,
                postMaintenanceAssetStatus,
                evidenceUrl: afterPhotoUrl || null
            });

            navigate('/technician');
        } catch (err) {
            setError(err.message || 'Failed to submit maintenance log.');
        } finally {
            setSubmitLoading(false);
        }
    };

    return {
        id,
        navigate,
        issue,
        loading,
        error,
        setError,
        status,
        actionTaken,
        setActionTaken,
        partsCost,
        setPartsCost,
        hoursSpent,
        setHoursSpent,
        postMaintenanceAssetStatus,
        setPostMaintenanceAssetStatus,
        afterPhotoUrl,
        setAfterPhotoUrl,
        uploadLoading,
        submitLoading,
        handleStatusChange,
        handleCheckToggle,
        handlePhotoUpload,
        handleSubmitReport,
    };
}
