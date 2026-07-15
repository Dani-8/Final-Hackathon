import React from 'react';
import { AlertTriangle, Link } from 'lucide-react';
import { usePublicAsset } from './hooks/usePublicAsset.js';
import { AssetHeader } from './components/AssetHeader.jsx';
import { SpecSheetActions } from './components/SpecSheetActions.jsx';
import { SpecDetails } from './components/SpecDetails.jsx';
import { ActivityLogs } from './components/ActivityLogs.jsx';

export function PublicAssetPage() {
    const {
        slug,
        asset,
        history,
        loading,
        error,
        downloadAssetSheet,
    } = usePublicAsset();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !asset) {
        return (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-8 rounded-xl text-center">
                <AlertTriangle className="w-12 h-12 text-rose-600 mx-auto mb-3" />
                <p className="font-semibold text-lg">Access Error</p>
                <p className="text-slate-500 text-sm mt-1">{error || 'The requested asset node could not be resolved.'}</p>
                
                <div className="mt-6">
                    <Link to="/" className="text-sm text-indigo-600 font-bold hover:underline">Return to Hub Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div id="public-asset-page-root" className="space-y-8">
            {/* Visual Header */}
            <AssetHeader asset={asset} />

            {/* Download Sheet and Actions bar */}
            <SpecSheetActions downloadAssetSheet={downloadAssetSheet} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Safe details column */}
                <div className="md:col-span-2">
                    <SpecDetails asset={asset} slug={slug} />
                </div>

                {/* Safe Activity Logs list */}
                <ActivityLogs history={history} />
            </div>
        </div>
    );
}

export default PublicAssetPage;
