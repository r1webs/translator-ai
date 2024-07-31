/**
 * @extends Error
 */
class ExtendableError extends Error {
  /**
   * Creates a new instance of the ExtendableError class.
   *
   * @param {object} options - The options for creating the error.
   * @param {string} options.message - The error message.
   * @param {Array} [options.errors] - Additional error information.
   * @param {number} [options.status] - The HTTP status code of the error.
   * @param {boolean} [options.isPublic] - Whether the error message should be visible to the user.
   * @param {string} [options.stack] - The stack trace of the error.
   */
  constructor({
    message,
    errors,
    status,
    isPublic,
    stack,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

module.exports = ExtendableError;
