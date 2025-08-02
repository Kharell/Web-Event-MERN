// code untuk menghendle semua eror yang ada di folder errors

const { StatusCodes } = require("http-status-codes");
const errorHendlerMiddleware = (err, req, res, next) => {

  // log untuk melihat eror di terminal
  // console.log("err");
  // console.log(err.message);

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  // error validation dari mongoose untuk kode model db
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400; // Bad Request
  }
  // error untuk kode duplikat
  // misal ketika ada data yang sudah ada di db, dan kita ingin memasukkan data yang sama
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400; // Bad Request
  }
  // error untuk kode tidak ditemukan
  // misal ketika kita ingin mengakses data yang tidak ada di db
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404; // Not Found
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHendlerMiddleware;
