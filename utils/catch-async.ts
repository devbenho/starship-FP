import { Request, Response, NextFunction } from 'express';

const catchAsyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); 
  };
};

export  {catchAsyncHandler};