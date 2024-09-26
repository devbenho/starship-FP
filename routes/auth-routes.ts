import { Router } from 'express';
import { signInHandler, signUpHandler } from '../controllers/auth.controller';

const router = Router();

// User routes
router.post('/signup', signUpHandler);
router.post('/signin', signInHandler);

export default router;