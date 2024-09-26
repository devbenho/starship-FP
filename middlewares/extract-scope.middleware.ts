import {Request, Response , NextFunction} from 'express'
import { ScopeModel } from '../models/scope';

const extractScopeMiddleware = async (req:Request,  res: Response, next: NextFunction) => {
    const scopeId = res.locals.scope;
    const scope = await ScopeModel.findById(scopeId);
    
    if (!scope) {
         res.status(401).send({ error: "No scope provided" });
         return;
    }
    
    res.locals.scope = scope.name;
    next();
}

export {extractScopeMiddleware}