import express from 'express';
import viewRouter from './routes/view/view.route.js';
import uploadRouter from './routes/upload/upload.route.js';
const router = express.Router();
router.get('/', (req, res) => { return res.sendStatus(200); });
router.use('/v/', viewRouter);
router.use('/upload', uploadRouter);
export default router;
