import { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';
import { verifyToken } from '../utils'; 
import { NextFunction, Request, Response } from 'express';
import { JWTPayload } from '../@types';
import { ERRORS_MASSAGES } from '../utils/errors.enum';
import { UserModel } from '../models/user';
import { APIError, UnauthorizedError } from '../errors';


export const authMiddleware = async (req : Request, res : Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return next(new APIError(ERRORS_MASSAGES.NO_TOKEN_PROVIDED, 401)); 
    }

    let payload: JWTPayload;
    try {
        payload = verifyToken(token); 
    } catch (e) {
        const verifyErr = e as VerifyErrors;
        if (verifyErr instanceof TokenExpiredError) {
             next(verifyErr)
        }
        next(verifyErr)
        return;
    }

    const user = await UserModel.findById(payload.userId); 
    if (!user) {
         res.status(401).send({ error: ERRORS_MASSAGES.USER_NOT_FOUND });
         return;
    }
    
    res.locals.userId = user?.id; 
    res.locals.scope = user?.scopeId;
    res.cookie('token', token, { httpOnly: true });
    return next(); 
};

