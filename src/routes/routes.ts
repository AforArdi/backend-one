import { Router } from 'express';
import { router as authRouter } from '../modules/auth/auth.routes.js';
import otpRouter from '../modules/otp/otp.routes.js';

const router: Router = Router();

const moduleRouters = [
    {
        path: '/auth',
        router: authRouter
    },
    {
        path: '/otp',
        router: otpRouter
    }
];

moduleRouters.forEach((route) => router.use(route.path, route.router));

export default router;