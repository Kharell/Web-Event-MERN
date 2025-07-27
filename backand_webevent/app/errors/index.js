// saat ingin menggunakan bad-request, custom api eror, not-found
// maka di gunakan saja file index.js ini agar terpusat ke satu file

const CustomApiError = require("./custom-api-error");
const BadRequest = require("./bad-request");
const NotFound = require("./not-found");

module.exports = {
  CustomApiError,
  BadRequest,
  NotFound,
};
