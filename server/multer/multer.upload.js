import diskStorage from './multer.diskstorage.js';
import multer from 'multer';
/* Set the filesize */
const fileSize = 1 * 1024 * 1024 * 1024; // Limit to 1GB
/* Multer upload which uses the diskStorage */
const multerUpload = multer({
    storage: diskStorage,
    limits: {
        fileSize: fileSize
    }
});
export default multerUpload;
