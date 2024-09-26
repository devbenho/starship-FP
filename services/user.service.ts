import { UserModel } from "../models/user";

const getUserDetails = async (userId: string): Promise<any> => {
    return await UserModel.findById(userId).select('-password').populate('scopeId', 'name');
};
  
export { getUserDetails };