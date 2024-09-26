function generateResponse(status: number, message: string, data?: any) {
    return {
        status,
        message,
        data
    };
}

function generateErrorResponse(status: number, message: string) {
    return {
        status,
        message
    };
}

export { generateResponse, generateErrorResponse };