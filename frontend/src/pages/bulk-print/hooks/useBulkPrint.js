import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { assetService } from '../../../services/assetService.js';

export function useBulkPrint() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const idsString = searchParams.get('ids') || '';

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadAssetsForPrint() {
            if (!idsString) {
                setError('No assets specified for printing.');
                setLoading(false);
                return;
            }

            try {
                const ids = idsString.split(',');
                const fetched = [];

                for (let id of ids) {
                    const item = await assetService.getById(id);
                    fetched.push(item);
                }

                setAssets(fetched);
            } catch (err) {
                setError(err.message || 'Failed to fetch selected assets.');
            } finally {
                setLoading(false);
            }
        }
        
        loadAssetsForPrint();
    }, [idsString]);

    const handlePrintTrigger = () => {
        window.print();
    };

    return {
        navigate,
        assets,
        loading,
        error,
        handlePrintTrigger,
    };
}
