import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assetService } from '../../../services/assetService.js';
import { formatDate } from '../../../utils/formatDate.js';

export function usePublicAsset() {
    const { slug } = useParams();

    const [asset, setAsset] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchPublicDetails() {
            setLoading(true);
            try {
                const data = await assetService.getPublicBySlug(slug);
                
                setAsset(data.asset);
                setHistory(data.recentActivity || []);
            } catch (err) {
                setError(err.message || 'Asset not found or public access restricted.');
            } finally {
                setLoading(false);
            }
        }
        fetchPublicDetails();
    }, [slug]);

    const downloadAssetSheet = () => {
        if (!asset) return;

        const logContent = history.map(log =>
            `[${formatDate(log.createdAt)}] ${log.action}: ${log.description}`
        ).join('\n');

        const content = `==================================================
ASSET SPECIFICATION SHEET
==================================================
Asset Name:         ${asset.name}
Asset Code:         ${asset.assetCode}
Category:           ${asset.category}
Location:           ${asset.location}
Condition:          ${asset.condition}
Current Status:     ${asset.status}
Last Serviced:      ${formatDate(asset.lastServiceDate)}
Next Service Due:   ${formatDate(asset.nextServiceDate)}
Retired:            ${asset.isRetired ? 'Yes' : 'No'}

==================================================
RECENT ACTIVITY LOGS
==================================================
${logContent || 'No activity logs registered.'}

==================================================
Generated on:       ${new Date().toLocaleString()}
Property Node Verification: Verified Secure Token
==================================================`;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `Asset-Sheet-${asset.assetCode}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    };

    return {
        slug,
        asset,
        history,
        loading,
        error,
        downloadAssetSheet,
    };
}
