import process from 'process';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
/* Due to it being hex the actual length will be double the amount provided */
const generatedFileNameLength = 32;
const workingDirectory = process.cwd();
const publicRoute = path.join(workingDirectory, 'server', 'public');
const multerStorage = multer.diskStorage({
    "destination": (req, file, callback) => {
        callback(null, publicRoute);
    },
    "filename": (req, file, callback) => {
        /* Get the file extension */
        const fileExtension = path.parse(file.originalname).ext || '';
        /* Get the filename */
        const generatedFileName = crypto.randomBytes(generatedFileNameLength).toString('hex') + fileExtension;
        /* Check if the file already exists */
        if (fs.existsSync(path.join(publicRoute, generatedFileName))) {
            callback(new Error('file exists'), '');
        }
        /* Callback to the main function in the upload route */
        callback(null, generatedFileName);
    }
});
export default multerStorage;
