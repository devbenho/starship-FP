import { Request, Response } from 'express';
import { CreateUserResponse, AuthResponse } from '../@types';
import { catchAsyncHandler } from '../utils';
import { getUserDetails, loginUser, registerUser } from '../services';

const signUpHandler = catchAsyncHandler(async (req: Request, res: Response): Promise<Response<CreateUserResponse>> => {
  const { email, password, scope, name } = req.body;
  const response = await registerUser({ email, password, scope, name });
  return res.status(201).json(response);
});

const signInHandler = catchAsyncHandler(async (req: Request, res: Response): Promise<Response<AuthResponse>> => {
  const { email, password } = req.body;
  const response = await loginUser(email, password);
  return res.status(200).json(response);
});


export { signUpHandler, signInHandler };