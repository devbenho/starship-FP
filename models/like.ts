import mongoose, { Schema, Document, Types } from 'mongoose';


const LikeSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId,ref: 'User', required: true },
    text: { type: String, required: true },
    starshipId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const LikeModel = mongoose.model('Like', LikeSchema);