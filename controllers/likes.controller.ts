import { Request, Response } from "express";
import { catchAsyncHandler } from "../utils";
import { createLike, getLikes } from "../services/like.service";

const createLikeHandler = catchAsyncHandler(async (req: Request, res: Response): Promise<Response<any>> => {    
    const userId = res.locals.userId;
    const result = await createLike(
        { starshipId: req.params.starshipId, userId, text: req.body.text }
    );
    return res.status(200).json(result);
});

const getLikesHandler = catchAsyncHandler(async (req: Request, res: Response): Promise<Response<any>> => {
    const starshipId = req.params.starshipId;

    const likes = await getLikes(starshipId);
    
    const count = likes.length;

    return res.status(200).json({
        count,
        likes
    });
});

export { createLikeHandler, getLikesHandler };