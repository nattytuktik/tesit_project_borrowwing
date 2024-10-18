export class ServicesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServicesError";
  }
}

// Path: src/utils/error.type.ts
// Status code: 404
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

// status code: 400
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

// Internal Server Error
export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}
