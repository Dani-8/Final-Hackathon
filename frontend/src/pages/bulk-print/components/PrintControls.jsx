import React from 'react';
import { ArrowLeft, Printer } from 'lucide-react';

export function PrintControls({ navigate, handlePrintTrigger }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/admin/assets')}
                    className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-800 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                
                <div>
                    <h1 className="font-display font-bold text-lg text-slate-800">Print QR Label Sheet</h1>
                    <p className="text-xs text-slate-500">Rendered in high-contrast monochrome layout optimized for thermal labels or A4 adhesive sheets.</p>
                </div>
            </div>

            <button
                onClick={handlePrintTrigger}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
                <Printer className="w-4 h-4" />
                <span>Print Page</span>
            </button>
        </div>
    );
}
