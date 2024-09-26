type CreateUserRequest = {
    name: string;
    email: string;
    password: string;
    scope: string;
}

type CreateUserResponse = {
    userId: string;
    token: string;
}

export { CreateUserRequest, CreateUserResponse };