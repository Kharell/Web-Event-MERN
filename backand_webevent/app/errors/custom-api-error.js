// konsep oop dalam javascript di guanakan untuk membuat error khusus
class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomApiError";
  }
}

module.exports = CustomApiError;
