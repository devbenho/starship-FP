import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { config } from "../configs/config";
import { JWTPayload } from '../@types';
dotenv.config();

function generateToken(payload:JWTPayload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration});
}

function verifyToken(token:string) : JWTPayload {
    const decoded =  jwt.verify(token, config.jwtSecret);
    return decoded as JWTPayload;
}

export { generateToken, verifyToken };