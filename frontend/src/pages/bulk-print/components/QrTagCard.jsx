import React from 'react';

export function QrTagCard({ asset }) {
    const publicUrl = `${window.location.origin}/public/assets/${asset.publicUrlSlug}`;

    return (
        <div
            className="border-4 border-slate-950 p-6 rounded-2xl flex flex-col items-center justify-between text-center bg-white min-h-[340px] shadow-sm print:shadow-none break-inside-avoid-page"
        >
            <div className="w-full">
                <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-slate-500">Property Node QR Tag</span>
                <h3 className="font-display font-extrabold text-lg text-slate-950 leading-tight mt-1 truncate">{asset.name}</h3>
                <div className="w-full h-px bg-slate-200 my-3"></div>
            </div>

            {asset.qrCodeUrl ? (
                <div className="border-2 border-slate-950 p-2 bg-white rounded-xl">
                    <img src={asset.qrCodeUrl} alt="QR Code" className="w-40 h-40" />
                </div>
            ) : (
                <div className="w-40 h-40 bg-slate-100 flex items-center justify-center text-xs text-slate-400 rounded-xl">
                    QR Missing
                </div>
            )}

            <div className="w-full mt-4">
                <p className="font-mono text-xs font-bold text-slate-950 tracking-tight">ID: {asset.assetCode}</p>
                <p className="text-[9px] text-slate-500 font-medium truncate mt-0.5">{asset.location}</p>
                <div className="w-full h-px bg-slate-100 my-2"></div>
                <p className="text-[8px] font-mono text-slate-400 font-semibold uppercase">{publicUrl}</p>
            </div>
        </div>
    );
}
