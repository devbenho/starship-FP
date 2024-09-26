type CreateLikeRequest = {
    userId: string,
    starshipId: string,
    text: string,
}

type CreateLikeResponse = {
    likeId: string,
    starshipId: string,
    userId: string,
    text: string,
}

export { CreateLikeRequest, CreateLikeResponse };

