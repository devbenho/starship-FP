import mongoose from "mongoose";
import { config } from "../configs/config";
import { APIError } from "../errors";
import { MongoServerError } from "mongodb"; 
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

interface CustomError extends Error  {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  code?: number;
  path?: string;
  value?: any;
  errors?: { [key: string]: { message: string } };
}


const handleCastErrorDB = (err: CustomError): APIError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new APIError(message, 400);
};

const handleDuplicateFieldsDB = (err: CustomError): APIError => {
  const match = err.message.match(/(["'])(\\?.)*?\1/);
  const value = match ? match[0] : 'unknown value'; // Handle null case

  const message = `Duplicate field value: ${value}. Please use another value!`;
  
  return new APIError(message, 400);
};

const handleValidationErrorDB = (err: CustomError): APIError => {
  const errors = Object.values(err.errors || {}).map(el => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new APIError(message, 400);
};

const handleJWTError = (): APIError => new APIError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = (): APIError => 
  new APIError("Your token has expired! Please log in again.", 401);

const sendErrorDev = async (err: CustomError & mongoose.Error, req: any, res: any): Promise<void> => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

};

const sendErrorProd = async (err: CustomError & mongoose.Error, req: any, res: any): Promise<void> => {
    console.log('kkkkk');
    
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: `${err.message} `
      });
    }

    console.error("ERROR 💥", err);

    return res.status(500).json({
      status: "error",
      message: `Something went wrong!`
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: `${err.message}`
    });
  }

  console.error("ERROR 💥", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: `Please try again later. `
  });
};
export default function globalErrorHandler(err: CustomError, req: any, res: any, next: any): void {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    
    if (err instanceof mongoose.Error) {
      if (err.name === "CastError") {
        err = handleCastErrorDB(err);
      } else if (err.code === 11000) {
        err = handleDuplicateFieldsDB(err);
      } else if (err.name === "ValidationError") {
        err = handleValidationErrorDB(err);
      }
    } else if (err instanceof MongoServerError && err.code === 11000) {
      const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
      const field = Object.keys(err.keyValue)[0];
      const message = `Duplicate field ${field} value: ${value}. Please use another value!`;
      err = new APIError(message, 409); 
    } else if (err instanceof JsonWebTokenError) {
      err = handleJWTError();
    } else if (err instanceof TokenExpiredError) {
      err = handleJWTExpiredError();
    }
  
    if (config.nodeEnv === "development") {
      sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === "production") {
      sendErrorProd(err, req, res);
    }
  }