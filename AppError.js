// Error class
class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = AppError; // Export the AppError class so it can be used in other files