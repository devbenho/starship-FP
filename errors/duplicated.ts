import { APIError } from "./api-error";

class DuplicatedError extends APIError {
    constructor(message = "Duplicated") {
        super(message, 409);
    }
}

export { DuplicatedError };