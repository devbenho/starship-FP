import mongoose from "mongoose";
import { SCOPE_NAME } from "../utils/constants.enum";

const { Schema } = mongoose;

const scopeSchema = new Schema({
    name: {
        type: String,
        enum: Object.values(SCOPE_NAME), 
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
    
});

// Create the model
const ScopeModel = mongoose.model('Scope', scopeSchema);

export { ScopeModel };
