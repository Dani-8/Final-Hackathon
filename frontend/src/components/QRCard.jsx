import React, { useState } from 'react'
import { Copy, Download, ExternalLink, Check } from 'lucide-react'


export function QRCard({ asset, id }) {
    const [copied, setCopied] = useState(false)

    if (!asset) return null

    const publicUrl = `${window.location.origin}/public/assets/${asset.publicUrlSlug}`

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl);
            
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy public URL:', err);
        }
    }

    const downloadQR = async () => {
        try {
            const response = await fetch(asset.qrCodeUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `QR-${asset.assetCode}.png`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.warn('Blob fetch failed, falling back to direct open:', err)

            const link = document.createElement('a')

            link.href = asset.qrCodeUrl;
            link.target = '_blank';
            link.download = `QR-${asset.assetCode}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <div id={id || 'qr-card-container'} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center">
            <h3 className="font-display font-semibold text-lg text-slate-800 mb-1">Asset QR Code</h3>
            <p className="text-xs text-slate-500 font-mono mb-4">{asset.assetCode}</p>

            {asset.qrCodeUrl ? (
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-4 shadow-inner">
                    <img
                        id="qr-code-image-element"
                        src={asset.qrCodeUrl}
                        alt={`QR code for ${asset.name}`}
                        className="w-48 h-48 mix-blend-multiply"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <div className="w-48 h-48 bg-slate-100 flex items-center justify-center rounded-lg mb-4 text-xs text-slate-400">
                    No QR generated
                </div>
            )}


            <div className="w-full space-y-2">
                <button
                    id="copy-public-link-btn"
                    onClick={copyLink}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Public Link</span>
                        </>
                    )}
                </button>

                {asset.qrCodeUrl && (
                    <button
                        id="download-qr-link-btn"
                        onClick={downloadQR}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download PNG</span>
                    </button>
                )}

                <a
                    id="open-public-asset-page-btn"
                    href={`/public/assets/${asset.publicUrlSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Public Page</span>
                </a>
            </div>
        </div>
    );
}
export default QRCard;
