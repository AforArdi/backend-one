import { Router } from 'express';
import { router as authRouter } from '../modules/auth/auth.routes.js';

const router: Router = Router();

const moduleRouters = [
    {
        path: '/auth',
        router: authRouter
    },
];

moduleRouters.forEach((route) => router.use(route.path, route.router));

export default router;