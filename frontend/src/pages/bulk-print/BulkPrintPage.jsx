import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useBulkPrint } from './hooks/useBulkPrint.js';
import { PrintControls } from './components/PrintControls.jsx';
import { PrintGrid } from './components/PrintGrid.jsx';

export function BulkPrintPage() {
    const {
        navigate,
        assets,
        loading,
        error,
        handlePrintTrigger,
    } = useBulkPrint();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24 print:hidden">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || assets.length === 0) {
        return (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-8 rounded-xl text-center max-w-md mx-auto mt-12 print:hidden">
                <AlertTriangle className="w-12 h-12 text-rose-600 mx-auto mb-3" />
                <p className="font-semibold text-lg">Print Error</p>
                <p className="text-slate-500 text-sm mt-1">{error || 'No valid assets found to render.'}</p>
                
                <button onClick={() => navigate('/admin/assets')} className="mt-6 text-sm text-indigo-600 font-bold hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div id="bulk-print-page" className="space-y-6 max-w-4xl mx-auto p-4">
            <PrintControls navigate={navigate} handlePrintTrigger={handlePrintTrigger} />
            <PrintGrid assets={assets} />
        </div>
    );
}

export default BulkPrintPage;
