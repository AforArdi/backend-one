import express, { type Application, type Request, type Response } from 'express';
import router from './routes/routes.js';
import notFound from './middleware/notFound.js';
import globalError from './middleware/globalError.js';
// import { env } from './config/env.js';

const app: Application = express();
app.use(express.json());

// const port = env.port;

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Rise Together API!');
});

app.use(notFound);
app.use(globalError);

export default app;
