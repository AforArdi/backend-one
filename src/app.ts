import express, { type Application } from 'express';
import router from './routes/routes.js';
import notFound from './middleware/notFound.js';
import globalError from './middleware/globalError.js';
import { env } from './config/env.js';

const app: Application = express();

const port = env.port;

app.use(express.json());
app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send('Welcome to the Rise Together API!');
});

app.use(notFound);
app.use(globalError);

export default app;
