import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createLikeHandler, getLikesHandler } from '../controllers/likes.controller';
import { extractScopeMiddleware } from '../middlewares/extract-scope.middleware';
import scopeValidator from '../middlewares/scope-validator.middleware';
import { createCommentHandler, getCommentsHandler } from '../controllers';

const router = Router();

// User routes
router.use(authMiddleware);

router.post('/:starshipId/likes', extractScopeMiddleware , scopeValidator('liker'),createLikeHandler);

router.post('/:starshipId/comments', extractScopeMiddleware , scopeValidator('commenter'),createCommentHandler);

router.get('/:starshipId/comments',getCommentsHandler);
router.get('/:starshipId/likes',getLikesHandler);

export default router;