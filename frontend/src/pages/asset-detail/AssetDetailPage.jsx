import React from 'react';
import { ArrowLeft, Edit2, ShieldAlert, Trash2 } from 'lucide-react';
import { useAssetDetail } from './hooks/useAssetDetail.js';
import { AssetEditForm } from './components/AssetEditForm.jsx';
import { AssetReadOnlyDetails } from './components/AssetReadOnlyDetails.jsx';
import { AssetAuditLogs } from './components/AssetAuditLogs.jsx';
import { QRCard } from '../../components/QRCard.jsx';

export function AssetDetailPage() {
    const {
        asset,
        history,
        technicians,
        loading,
        error,
        isEditing,
        setIsEditing,
        name,
        setName,
        location,
        setLocation,
        condition,
        setCondition,
        status,
        setStatus,
        assignedTechnician,
        setAssignedTechnician,
        lastServiceDate,
        setLastServiceDate,
        nextServiceDate,
        setNextServiceDate,
        editLoading,
        handleUpdate,
        handleRetire,
        navigate,
    } = useAssetDetail();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!asset) {
        return (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-lg text-sm text-center">
                Asset not found.
            </div>
        );
    }

    return (
        <div id="asset-detail-page-root">
            {/* Page header */}
            <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/assets')}
                        className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-800 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="font-display font-extrabold text-3xl text-slate-900 truncate max-w-md">{asset.name}</h1>
                        <p className="text-sm text-slate-500 font-mono">CODE: {asset.assetCode} — SLUG: {asset.publicUrlSlug}</p>
                    </div>
                </div>

                {!asset.isRetired && (
                    <div className="flex gap-2">
                        <button
                            id="toggle-edit-asset-btn"
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                        >
                            <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{isEditing ? 'Cancel Editing' : 'Edit Asset'}</span>
                        </button>
                        <button
                            id="retire-asset-btn"
                            onClick={handleRetire}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                            <span>Retire Asset</span>
                        </button>
                    </div>
                )}
            </div>

            {error && (
                <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {asset.isRetired && (
                <div className="mb-6 bg-slate-100 border border-slate-300 text-slate-700 p-4 rounded-lg text-sm flex gap-2.5 items-center">
                    <ShieldAlert className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    <div>
                        <span className="font-bold">This Asset Node is Retired.</span> It is kept only for archival, historical logging, and compliance. No new issue tickets can be opened on it.
                    </div>
                </div>
            )}


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Middle Column: Details/Editor & History */}
                <div className="lg:col-span-2 space-y-8">
                    {isEditing ? (
                        <AssetEditForm
                            name={name}
                            setName={setName}
                            location={location}
                            setLocation={setLocation}
                            condition={condition}
                            setCondition={setCondition}
                            status={status}
                            setStatus={setStatus}
                            assignedTechnician={assignedTechnician}
                            setAssignedTechnician={setAssignedTechnician}
                            lastServiceDate={lastServiceDate}
                            setLastServiceDate={setLastServiceDate}
                            nextServiceDate={nextServiceDate}
                            setNextServiceDate={setNextServiceDate}
                            technicians={technicians}
                            editLoading={editLoading}
                            setIsEditing={setIsEditing}
                            handleUpdate={handleUpdate}
                        />
                    ) : (
                        <AssetReadOnlyDetails asset={asset} />
                    )}

                    {/* Secure Append-Only History Log list */}
                    <AssetAuditLogs history={history} />
                </div>


                {/* Right Column: QR tag card */}
                <div>
                    <QRCard asset={asset} />
                </div>
            </div>
        </div>
    );
}

export default AssetDetailPage;
