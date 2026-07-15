import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { issueService } from '../../../services/issueService.js';
import { assetService } from '../../../services/assetService.js';

export function useIssueStatusLookup() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialNum = searchParams.get('num') || '';
    const initialTab = searchParams.get('tab') || 'ticket'; // 'ticket' or 'asset'

    const [activeTab, setActiveTab] = useState(initialTab);
    const [issueNumber, setIssueNumber] = useState(initialNum);
    const [assetCode, setAssetCode] = useState('');
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const lookupStatus = async (numberToSearch) => {
        const num = numberToSearch || issueNumber;
        if (!num) return;

        setError('');
        setLoading(true);
        setIssue(null);

        try {
            const data = await issueService.getPublicStatus(num);
            setIssue(data);
        } catch (err) {
            setError(err.message || 'Issue number not found.');
        } finally {
            setLoading(false);
        }
    };

    const lookupAssetByCode = async (e) => {
        if (e) e.preventDefault();
        if (!assetCode.trim()) return;

        setError('');
        setLoading(true);

        try {
            const data = await assetService.getPublicByCode(assetCode.trim());
            if (data && data.publicUrlSlug) {
                navigate(`/public/assets/${data.publicUrlSlug}`);
            } else {
                throw new Error('Could not resolve asset slug.');
            }
        } catch (err) {
            setError(err.message || `No asset found with code "${assetCode.toUpperCase()}"`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialNum) {
            lookupStatus(initialNum);
        }
    }, [initialNum]);

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && (tabParam === 'ticket' || tabParam === 'asset')) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError('');
        setSearchParams({ tab });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        lookupStatus();
    };

    return {
        activeTab,
        issueNumber,
        setIssueNumber,
        assetCode,
        setAssetCode,
        issue,
        loading,
        error,
        setError,
        handleTabChange,
        handleSubmit,
        lookupAssetByCode,
    };
}
