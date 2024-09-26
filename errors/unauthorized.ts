import { ERRORS_MASSAGES } from "../utils/errors.enum";
import { APIError } from "./api-error"
class UnauthorizedError extends APIError {
    constructor(message = ERRORS_MASSAGES.UNAUTHORIZED) {
        super(message, 401);
    }
}

export { UnauthorizedError };