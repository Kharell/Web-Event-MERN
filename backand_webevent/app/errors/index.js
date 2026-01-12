// saat ingin menggunakan bad-request, custom api eror, not-found
// maka di gunakan saja file index.js ini agar terpusat ke satu file

const CustomApiError = require("./custom-api-error");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthorizedError = require("./unauthorized");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
  CustomApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  UnauthenticatedError,
};
