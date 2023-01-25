import process from 'process';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

/* Due to it being hex the actual length will be double the amount provided */ 
const generatedFileNameLength: number = 32;
const workingDirectory = process.cwd();
const publicRoute = path.join(workingDirectory, 'server', 'public');

const multerStorage: multer.StorageEngine = multer.diskStorage({ 
    "destination": (req: Express.Request, file: Express.Multer.File, callback: any) => {
        callback(null, publicRoute);
    },

    "filename": (req: Express.Request, file: Express.Multer.File, callback: any) => {
        /* Get the file extension */
        const fileExtension: string = path.parse(file.originalname).ext || ''
        
        /* Get the filename */ 
        const generatedFileName: string = crypto.randomBytes(generatedFileNameLength).toString('hex') + fileExtension;

        /* Check if the file already exists */
        if(fs.existsSync(path.join(publicRoute, generatedFileName))){ callback(new Error('file exists'), ''); }
        
        /* Callback to the main function in the upload route */
        callback(null, generatedFileName)
    }
});

export default multerStorage;
