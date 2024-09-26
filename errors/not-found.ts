import { APIError } from "./api-error";

class NotFoundError extends APIError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

export { NotFoundError };