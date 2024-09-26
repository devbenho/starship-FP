import { AuthResponse, CreateUserRequest, CreateUserResponse, JWTPayload } from '../@types';
import { UserModel } from '../models/user';
import { generateToken } from '../utils/jwt';
import { DuplicatedError, InvalidCredentials, NotFoundError } from '../errors';
import bcrypt from 'bcrypt';
import { ERRORS_MASSAGES } from '../utils/errors.enum';
import { ScopeModel } from '../models/scope';

const createUserObject = (
    name: string,
    email: string,
    password: string,
    scope: string
) => ({
    name,
    email,
    password,
    scopeId: scope,
});

// Register a new user
const registerUser = async (request: CreateUserRequest): Promise<CreateUserResponse> => {

    const { email, password, scope, name } = request;
    await isUserExist(email);
    const scopeExist = await ScopeModel.findById(scope);
    if (!scopeExist) {
        throw new NotFoundError(ERRORS_MASSAGES.SCOPE_NOT_FOUND);
    }

    const newUser = createUserObject(name, email, password, scope);
    const createdUser = await new UserModel(newUser).save();
    

    const payload: JWTPayload = {
        userId: createdUser._id.toString(),
        scope: createdUser.scopeId.toString(),
    };

    return {
        userId: createdUser._id.toString(),
        token: generateToken(payload),
    };
};

const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const userExist = await isUserExist(email);
    if (!userExist) {
        throw new NotFoundError(ERRORS_MASSAGES.USER_NOT_FOUND);
    }

    const user = await UserModel.findOne({ email });
    const isPasswordValid = user && await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const payload: JWTPayload = {
            userId: user._id.toString(),
            scope: user.scopeId.toString(),
        };
        return {
            userId: user._id.toString(),
            token: generateToken(payload),
        };
    } else {
        throw new InvalidCredentials();
    }
};


// Check if user exists
const isUserExist = async (email: string): Promise<boolean> => {
    const user = await UserModel.findOne({ email });
    return !!user;
};

export { registerUser, loginUser };