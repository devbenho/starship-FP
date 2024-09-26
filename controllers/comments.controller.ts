import { Request, Response } from "express";
import { catchAsyncHandler } from "../utils";
import { createComment, getComments } from "../services/comment.service";

// Existing createCommentHandler
const createCommentHandler = catchAsyncHandler(async (req: Request, res: Response): Promise<Response<any>> => {
    
    const userId = res.locals.userId;
    const result = await createComment({ 
        starshipId: req.params.starshipId, 
        userId, 
        comment: req.body.comment
    });
    return res.status(200).json(result);
});

const getCommentsHandler = catchAsyncHandler(async (req: Request, res: Response): Promise<Response<any>> => {
    const starshipId = req.params.starshipId;

    const comments = await getComments(starshipId);
    
    const count = comments.length;

    return res.status(200).json({
        count,
        comments
    });
});

export { createCommentHandler, getCommentsHandler };