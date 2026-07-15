import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assetService } from '../../../services/assetService.js';

export function useAssetsList() {
    const navigate = useNavigate();
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters state
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [showRetired, setShowRetired] = useState('false');

    // Multi select for printing
    const [selectedAssetIds, setSelectedAssetIds] = useState([]);

    
    async function loadAssets() {
        setLoading(true)

        try {
            const params = {};
            if (search) params.search = search;
            if (category) params.category = category;
            if (status) params.status = status;
            if (showRetired) params.isRetired = showRetired;

            const data = await assetService.getAll(params);
            setAssets(data);
        } catch (err) {
            setError(err.message || 'Failed to load assets.');
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadAssets();
    }, [search, category, status, showRetired]);


    const toggleSelectAsset = (id) => {
        if (selectedAssetIds.includes(id)) {
            setSelectedAssetIds(selectedAssetIds.filter(item => item !== id));
        } else {
            setSelectedAssetIds([...selectedAssetIds, id]);
        }
    };


    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedAssetIds(assets.map(a => a._id));
        } else {
            setSelectedAssetIds([]);
        }
    };


    const handlePrintBulk = () => {
        if (selectedAssetIds.length === 0) {
            alert('Please select at least one asset to print.');
            return;
        }

        const idsString = selectedAssetIds.join(',');

        navigate(`/admin/assets/bulk-print?ids=${idsString}`);
    };


    return {
        assets, loading, error, search, setSearch, category, setCategory, status, setStatus, showRetired, setShowRetired,
        selectedAssetIds, toggleSelectAsset, handleSelectAll, handlePrintBulk
    };
}
