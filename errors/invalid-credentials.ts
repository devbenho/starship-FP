import { APIError } from "./api-error";
import {  } from "../utils";
import { ERRORS_MASSAGES } from "../utils/errors.enum";
class InvalidCredentials extends APIError {
    constructor(message = ERRORS_MASSAGES.INVALID_CREDENTIALS) {
        super(message, 401);
    }
}

export { InvalidCredentials };