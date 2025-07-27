// import http-status-codes
const { statusCodes } = require("http-status-codes");

// import custom api error
const CustomApiError = require("./custom-api-error");

class BadRequest extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
