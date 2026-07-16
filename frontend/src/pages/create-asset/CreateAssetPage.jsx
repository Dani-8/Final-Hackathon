import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCreateAsset } from './hooks/useCreateAsset.js';
import { AssetCreationForm } from './components/AssetCreationForm.jsx';

export function CreateAssetPage() {
    const {
        navigate,
        name,
        setName,
        category,
        setCategory,
        location,
        setLocation,
        condition,
        setCondition,
        assignedTechnician,
        setAssignedTechnician,
        lastServiceDate,
        setLastServiceDate,
        nextServiceDate,
        setNextServiceDate,
        technicians,
        loading,
        error,
        handleSubmit,
    } = useCreateAsset();

    return (
        <div id="create-asset-page-root">
            {/* Header breadcrumb */}
            <div className="mb-8 flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/assets')}
                    className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-800 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                
                <div>
                    <h1 className="font-display font-extrabold text-3xl text-slate-900">Register Asset</h1>
                    <p className="text-sm text-slate-500 font-medium font-sans">Provision a new facility item, assign standard service parameters, and generate QR code identifiers.</p>
                </div>
            </div>

            <AssetCreationForm
                name={name}
                setName={setName}
                category={category}
                setCategory={setCategory}
                location={location}
                setLocation={setLocation}
                condition={condition}
                setCondition={setCondition}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                navigate={navigate}
            />
        </div>
    );
}

export default CreateAssetPage;
