import express, { type Application } from 'express';
import router from './routes/routes.js';
import notFound from './middleware/notFound.js';
import globalError from './middleware/globalError.js';

const app: Application = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send('Welcome to the Rise Together API!');
});

app.use(notFound);
app.use(globalError);

export default app;
