import express from 'express';
import env from '../../../env.js';
import { ObjectId } from 'mongodb';
import Database from '../../database/mongo.database.js';
const viewRouter = express.Router();
viewRouter.get('/:objectId', async (req, res) => {
    try {
        const db = new Database(env.database.username, env.database.password, env.database.cluster);
        const connection = await db.connect();
        const lookup = await db.get('firewire', 'content', { _id: new ObjectId(req.params.objectId) });
        if (typeof lookup !== "object" || lookup === null)
            return res.sendStatus(400);
        return res.render('view', { data: lookup });
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});
export default viewRouter;
