import { CreateCommentRequest } from "../@types/create-comment";
import { CommentModel } from "../models/comment";

const createCommentObject = ({ comment, starshipId, userId }: CreateCommentRequest) => ({
    comment,
    starshipId,
    userId,
});

const saveComment = async (commentData: ReturnType<typeof createCommentObject>) => {
    return await new CommentModel(commentData).save();
};

const formatCommentResponse = (createdComment: any) => ({
    commentId: createdComment._id,
    starshipId: createdComment.starshipId,
    userId: createdComment.userId,
    comment: createdComment.comment,
});

const createComment = async (request: CreateCommentRequest) => {
    const commentData = createCommentObject(request);
    const createdComment = await saveComment(commentData);
    return formatCommentResponse(createdComment);
};

const getComments = async (starshipId: string) => {
    return await CommentModel.find({ starshipId }).populate('userId', 'name');
};

export { createComment, getComments };