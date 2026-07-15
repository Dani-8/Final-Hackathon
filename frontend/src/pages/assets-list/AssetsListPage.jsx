import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Plus, Printer } from 'lucide-react';
import { useAssetsList } from './hooks/useAssetsList.js';
import { AssetFilters } from './components/AssetFilters.jsx';
import { AssetTable } from './components/AssetTable.jsx';

export function AssetsListPage() {
    const {
        assets, loading, error, search, setSearch, category, setCategory, 
        status, setStatus, showRetired, setShowRetired, selectedAssetIds, handleSelectAll, toggleSelectAsset, handlePrintBulk
    } = useAssetsList();

    
    return (
        <div id="assets-list-page-root">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-display font-extrabold text-3xl text-slate-900">Asset Inventory</h1>
                    <p className="text-sm text-slate-500">Add, edit, track QR nodes, and monitor active operational status.</p>
                </div>

                <div className="flex gap-2.5">
                    {selectedAssetIds.length > 0 && (
                        <button
                            id="bulk-print-assets-btn"
                            onClick={handlePrintBulk}
                            className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                        >
                            <Printer className="w-4 h-4 text-indigo-600" />
                            <span>Print QR Labels ({selectedAssetIds.length})</span>
                        </button>
                    )}

                    <Link
                        to="/admin/assets/new"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Register Asset</span>
                    </Link>
                </div>
            </div>


            {error && (
                <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}


            {/* Filter and Search Bar */}
            <AssetFilters
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                status={status}
                setStatus={setStatus}
                showRetired={showRetired}
                setShowRetired={setShowRetired}
            />


            {/* Assets Grid/Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : assets.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
                    <Shield className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-semibold text-lg">No assets found</p>
                    <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or register a new asset.</p>
                </div>
            ) : (
                <AssetTable
                    assets={assets}
                    selectedAssetIds={selectedAssetIds}
                    handleSelectAll={handleSelectAll}
                    toggleSelectAsset={toggleSelectAsset}
                />
            )}
        </div>
    );
}

export default AssetsListPage;
