type CreateCommentRequest = {
    userId: string,
    starshipId: string,
    comment: string,
}

type CreateCommentResponse = {
    commentId: string,
    starshipId: string,
    userId: string,
    comment: string,
}

export { CreateCommentRequest, CreateCommentResponse };

