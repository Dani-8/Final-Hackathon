import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';

export function SpecSheetActions({ downloadAssetSheet }) {
    return (
        <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="scanned-asset-actions">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-100 text-indigo-800 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-indigo-600" />
                </div>

                <div>
                    <h4 className="font-display font-bold text-sm text-slate-800">Scanned Asset Specifications Sheet</h4>
                    <p className="text-xs text-slate-500">Download the live specification file, maintenance history, or print this document.</p>
                </div>
            </div>


            <div className="flex flex-wrap gap-2.5">
                <button
                    onClick={downloadAssetSheet}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    id="download-asset-sheet-btn"
                >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Spec Sheet (.txt)</span>
                </button>
                
                <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    id="print-asset-sheet-btn"
                >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print / Save PDF</span>
                </button>
            </div>
        </div>
    );
}
