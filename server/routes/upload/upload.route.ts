/* Imports */
import express from 'express';
import env from '../../../env.js';
import { ObjectId } from 'mongodb';
import multerUpload from '../../multer/multer.upload.js';
import Database from '../../database/mongo.database.js';

/* Applications */
const multerUploadFile = multerUpload.single('file');
const uploadRouter: express.Router = express.Router();

/* Routes */
uploadRouter.post('/file', async(req: express.Request, res: express.Response) => {
    try {

        const db = new Database(env.database.username, env.database.password, env.database.cluster);
        const dbConnection = await db.connect();

        multerUploadFile(req, res, async(err) => {
            if(err){ throw new Error(err); }
            
            /* if req.file doesn't exist, then it will break */
            if(!req.file?.filename) throw new Error('req.file doesn\'t exist');

            /* create the post in the db */
            const createdPost = await db.set('firewire', 'content', { 
                title: Buffer.from(req.file.originalname).toString('utf-8'), 
                filename: req.file.filename, 
                size: req.file.size.toString(), 
                mimetype: req.file.mimetype
            });
            
            
            /* Check if the post has been made correctly */
            if(typeof createdPost !== "object") throw new Error('Response from db isn\'t correct');
            if(!createdPost.acknowledged) throw new Error('db didn\'t successfully acknowledge');
            
            /* Respond with a successful payload sharex or whatever */ 

            return res.status(200).json({ "response": 200, "error": null, "payload": new ObjectId(createdPost.insertedId).toHexString() });
        });
    } catch(err: any){
        console.log(err);
        return res.sendStatus(400);
    }
});

export default uploadRouter;
