import { Router } from 'express';
import { authController } from './auth.controller.js';
import { upload } from '../../middleware/multer.middleware.js';

export const router: Router = Router();
router.post('/register', upload.single("avatar"), authController.register);
router.post('/login', authController.login);
router.delete('/delete', authController.deleteUser);
router.patch('/update', authController.updateUser);
router.get('/get-users', authController.getAllUsers);
router.delete('/delete-avatar/:id', authController.deleteUserAvatar);
