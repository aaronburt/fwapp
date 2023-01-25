/* Imports */
import path from 'path';
import express from 'express';
import router from './server/router.js';
import env from './env.js';

/* Applications */
const app: express.Application = express();

/* Runtime */
app.set('view engine', 'ejs');

app.use('/asset', express.static(path.join(path.resolve(), 'server', 'assets')));

app.use('/content', express.static(path.join(path.resolve(), 'server', 'public')));

app.use(router);
app.listen(env.server.port, () => { console.log(`[${env.server.name}] started on ${env.server.port}`) });
