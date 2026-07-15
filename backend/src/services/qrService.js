import QRCode from 'qrcode';

export async function generateQrCode(publicUrl) {
    try {
        // Generate QR code as a Base64 Data URL (PNG)
        const qrDataUrl = await QRCode.toDataURL(publicUrl, {
            errorCorrectionLevel: 'H',
            margin: 2,
            color: {
                dark: '#0f172a', // deep navy/slate
                light: '#ffffff'
            }
        });
        return qrDataUrl;
    } catch (err) {
        console.error('❌ Failed to generate QR code:', err.message);
        // Return a dummy placeholder image URL or null
        return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(publicUrl)}`;
    }
}
