import { Router } from 'express';
import { authController } from './auth.controller.js';

export const router: Router = Router();
router.post('/login', authController.login);