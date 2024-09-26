import { CreateLikeRequest } from "../@types/create-like";
import { LikeModel } from "../models/like";

const createLikeObject = ({ text, starshipId, userId }: CreateLikeRequest) => ({
    text,
    starshipId,
    userId,
});

const saveLike = async (likeData: ReturnType<typeof createLikeObject>) => {
    return await new LikeModel(likeData).save();
};

const formatLikeResponse = (createdLike: any) => ({
    likeId: createdLike._id,
    starshipId: createdLike.starshipId,
    userId: createdLike.userId,
    text: createdLike.text,
});

const createLike = async (request: CreateLikeRequest) => {
    const likeData = createLikeObject(request);
    const createdLike = await saveLike(likeData);
    return formatLikeResponse(createdLike);
};

const getLikes = async (starshipId: string) => {
    return await LikeModel.find({ starshipId }).populate('userId', 'name');
};

export { createLike, getLikes };