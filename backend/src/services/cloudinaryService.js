import fs from 'fs';
import path from 'path';
import { isCloudinaryConfigured, getCloudinaryConfig } from '../config/cloudinary.js';

// If Cloudinary is available, we'd initialize it
let cloudinary = null;

async function initCloudinary() {
    if (cloudinary) return cloudinary;
    if (!isCloudinaryConfigured()) return null;

    try {
        const config = getCloudinaryConfig();
        const { default: v2 } = await import('cloudinary');

        cloudinary = v2.v2;

        cloudinary.config({
            cloud_name: config.cloudName,
            api_key: config.apiKey,
            api_secret: config.apiSecret
        })

        return cloudinary;
    } catch (err) {
        console.error('❌ Failed to load or initialize Cloudinary SDK:', err.message);

        return null;
    }
}


export async function uploadImage(file) {
    // file is an object from multer: { path, filename, originalname, mimetype, buffer }
    const cl = await initCloudinary();

    if (cl && file.path) {
        try {
            const result = await cl.uploader.upload(file.path, {
                folder: 'maintainiq_evidence',
                resource_type: 'auto'
            });
            // Delete local temp file after uploading to Cloudinary
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }

            return result.secure_url;
        } catch (err) {
            console.error('❌ Cloudinary upload failed, falling back to local file path:', err.message);
        }
    }

    // Fallback: If no Cloudinary, we serve the file locally
    // In a standard full-stack, local files can be saved and served
    if (file.path) {
        const filename = path.basename(file.path);
        const appUrl = process.env.APP_URL || 'http://localhost:3000';

        return `${appUrl}/api/uploads/${filename}`;
    }

    // Memory buffer fallback
    if (file.buffer) {
        const base64Data = file.buffer.toString('base64');

        return `data:${file.mimetype};base64,${base64Data}`;
    }
    

    return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400'; // Generic high-quality backup placeholder
}
