const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

var app = express();

// import routes
const categoriesRoutes = require("./app/api/v1/categories/router.js");

// inisialisasi route ke dalam variabel untuk di konsum ke api
const apiV1 = "/api/v1/cms";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// get ambil data
app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Back and page, Requoest Berhasil welcome sesi Belajar Karolus Jone Kalang",
  });
});


// memanggil route yang mau di pake
app.use(apiV1, categoriesRoutes);

module.exports = app;
