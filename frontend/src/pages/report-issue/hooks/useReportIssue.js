import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assetService } from '../../../services/assetService.js';
import { aiService } from '../../../services/aiService.js';
import { issueService } from '../../../services/issueService.js';
import { uploadRequest } from '../../../services/api.js';

export function useReportIssue() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 1. Initial complaint entry state
    const [complaint, setComplaint] = useState('');
    const [triageLoading, setTriageLoading] = useState(false);

    // 2. Triage suggestions state
    const [triageResult, setTriageResult] = useState(null);

    // Form parameters
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('medium');
    const [reporterName, setReporterName] = useState('');
    const [reporterContact, setReporterContact] = useState('');

    // Track if they override AI values
    const [aiFieldsEdited, setAiFieldsEdited] = useState(false);

    // Evidence file uploading
    const [evidenceFiles, setEvidenceFiles] = useState([]);
    const [uploadLoading, setUploadLoading] = useState(false);

    // 3. Post-submission success state
    const [successResult, setSuccessResult] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);


    useEffect(() => {
        async function loadAssetContext() {
            try {
                const data = await assetService.getPublicBySlug(slug);
                setAsset(data.asset);

                if (data.asset.isRetired) {
                    setError('This asset is retired. You cannot submit new issues.');
                }
            } catch (err) {
                setError(err.message || 'Failed to load asset context.');
            } finally {
                setLoading(false);
            }
        }
        loadAssetContext();
    }, [slug]);


    const handleAiTriage = async () => {
        if (!complaint || complaint.trim().length < 5) {
            alert('Please describe the problem in more detail (minimum 5 characters).');
            return;
        }

        setError('');
        setTriageLoading(true);

        try {
            const result = await aiService.triage(asset._id, complaint);
            setTriageResult(result);

            // Populate editable fields with AI recommendations
            setTitle(result.title);
            setCategory(result.category);
            setPriority(result.priority);
        } catch (err) {
            setError(err.message || 'AI Triage analysis failed.');
        } finally {
            setTriageLoading(false);
        }
    };


    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploadLoading(true);
        setError('');

        try {
            for (let file of files) {
                const formData = new FormData();
                formData.append('evidence', file);

                const res = await uploadRequest('/uploads/evidence', formData);
                if (res.success && res.data.url) {
                    setEvidenceFiles(prev => [...prev, { name: file.name, url: res.data.url }]);
                }
            }
        } catch (err) {
            setError(err.message || 'File upload failed.');
        } finally {
            setUploadLoading(false);
        }
    };


    const removeFile = (index) => {
        setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmitIssue = async (e) => {
        e.preventDefault();
        if (!title || !reporterName) {
            setError('Please provide a title and your name.');
            return;
        }

        setError('');
        setSubmitLoading(true);

        // Verify if any recommended values were edited
        const edited =
            title !== triageResult.title ||
            category !== triageResult.category ||
            priority !== triageResult.priority;

        try {
            const payload = {
                assetId: asset._id,
                title,
                description: complaint,
                category,
                priority,
                reporterName,
                reporterContact,
                evidenceUrls: evidenceFiles.map(f => f.url),
                aiSuggested: {
                    title: triageResult.title,
                    category: triageResult.category,
                    priority: triageResult.priority,
                    causes: triageResult.possibleCauses,
                    checks: triageResult.initialChecks
                },
                aiFieldsEdited: edited
            };

            const issue = await issueService.createPublic(payload);
            setSuccessResult(issue);
        } catch (err) {
            setError(err.message || 'Failed to submit issue report.');
        } finally {
            setSubmitLoading(false);
        }
    };

    return {
        slug,
        navigate,
        asset,
        loading,
        error,
        setError,
        complaint,
        setComplaint,
        triageLoading,
        triageResult,
        setTriageResult,
        title,
        setTitle,
        category,
        setCategory,
        priority,
        setPriority,
        reporterName,
        setReporterName,
        reporterContact,
        setReporterContact,
        aiFieldsEdited,
        setAiFieldsEdited,
        evidenceFiles,
        uploadLoading,
        successResult,
        submitLoading,
        handleAiTriage,
        handleFileUpload,
        removeFile,
        handleSubmitIssue,
    };
}
