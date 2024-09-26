import { Request, Response, NextFunction } from 'express';

const scopeValidator = (requiredScope: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userScope = res.locals.scope; 

        if (!userScope) {
             res.status(403).json({ message: 'Access denied. No user scope found.' });
             return;
        }

        if (userScope !== requiredScope) {
             res.status(403).json({ message: `Access denied. Required scope: ${requiredScope}.` });
             return;
        }

        next(); 
    };
};

export default scopeValidator;