const { StatusCodes } = require("http-status-codes");
// import custom api error
const CustomApiError = require("./custom-api-error");

// kelas untuk menangani error 404 not found
class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
