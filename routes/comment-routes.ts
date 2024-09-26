import { Router } from 'express';
import { createCommentHandler } from '../controllers/comments.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import scopeValidator from '../middlewares/scope-validator.middleware';
import { extractScopeMiddleware } from '../middlewares/extract-scope.middleware';

const router = Router();

// User routes
router.use(authMiddleware);
router.post('/', extractScopeMiddleware , scopeValidator('commenter'), createCommentHandler);

export default router;