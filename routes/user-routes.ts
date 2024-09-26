import { Router } from 'express';
import { getUserHandler } from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);
router.get('/me', getUserHandler);

export default router;