class BaseError extends Error {
  constructor(status, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

class NotFound extends BaseError {
  constructor(message) {
    super(404, message);
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  NotFound,
};
