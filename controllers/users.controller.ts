import { catchAsyncHandler } from "../utils";
import { getUserDetails } from "../services";
import { Request, Response } from 'express';
const getUserHandler = catchAsyncHandler(async (req: Request, res: Response): Promise<Response<any>> => {
    const userId = res.locals.userId;
    const userDetails = await getUserDetails(userId);
    if (!userDetails) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userDetails);
});



export { getUserHandler };