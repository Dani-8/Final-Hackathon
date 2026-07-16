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
    const cl = await initCloudinary();

    // If Cloudinary is configured and we have a memory buffer
    if (cl && file.buffer) {
        return new Promise((resolve, reject) => {
            const uploadStream = cl.uploader.upload_stream({
                folder: 'maintainiq_evidence',
                resource_type: 'auto'
            }, (error, result) => {
                if (error) {
                    console.error('❌ Cloudinary stream upload failed:', error.message);
                    return reject(error);
                }
                resolve(result.secure_url);
            });
            uploadStream.end(file.buffer);
        });
    }

    // Fallback: If no Cloudinary, convert buffer to base64 data URI
    if (file.buffer) {
        const base64Data = file.buffer.toString('base64');
        return `data:${file.mimetype};base64,${base64Data}`;
    }
    
    return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400'; // Generic high-quality backup placeholder
}
