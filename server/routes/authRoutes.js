import express from 'express';

import { loginController, logoutController, signupController } from '../controllers/authController.js';

const router = express.Router();

router.route('/signup').post(signupController);
router.route('/login').post(loginController);
router.route('/logout').post(logoutController);

export default router; 