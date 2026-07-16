import multer from 'multer';
import path from 'path';

// Use memory storage for Vercel (serverless doesn't allow writing to disk)
const storage = multer.memoryStorage();
    
const fileFilter = (req, file, cb) => {
    // Accept images and videos
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webp/i;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images and videos are allowed (jpeg, jpg, png, gif, mp4, mov, avi, webp)!'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 15 * 1024 * 1024 // 15MB max limit
    }
});


export default upload;
