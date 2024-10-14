export class CustomError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string, status: number = 404) {
        super(message, status);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string, status: number = 400) {
        super(message, status);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string, status: number = 403) {
        super(message, status);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string, status: number = 401) {
        super(message, status);
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string, status: number = 500) {
        super(message, status);
    }
}
export class ConflictError extends CustomError {
    constructor(message: string, status: number = 409) {
        super(message, status);
    }
}
