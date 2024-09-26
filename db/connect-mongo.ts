import mongoose from 'mongoose'; 
import { config } from '../configs/config';


const MONGO_URI = config.mongoUri; 

if (!MONGO_URI) {
    throw new Error('Mongo URI is missing');
}

export const connectToMongoDB = async () => {
    try{
        await mongoose.connect(MONGO_URI, {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};


