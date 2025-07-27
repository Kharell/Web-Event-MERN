const { statusCode } = require("http-status-codes");
// import custom api error
const CustomApiError = require("./custom-api-error");

// kelas untuk menangani error 404 not found
class NotFound extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.NOT_FOUND;
  }
}

module.exports = NotFound;
