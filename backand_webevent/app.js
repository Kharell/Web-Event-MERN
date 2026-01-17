const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

var app = express();

// inisialisasi route ke dalam variabel untuk di konsum ke api
const apiV1 = "/api/v1/cms";

// import routes
const categoriesRoutes = require("./app/api/v1/categories/router.js");
const imagesRoutes = require("./app/api/v1/images/router.js");
const talentsRoutes = require("./app/api/v1/talents/router.js");
const eventsRoutes = require("./app/api/v1/events/router.js");
const organizersRoutes = require("./app/api/v1/organizers/router.js");
const authCMSRoutes = require("./app/api/v1/auth/router.js");


// import Midleware
const notFound = require("./app/middlewares/not-found");
const errorHendlerMiddleware = require("./app/middlewares/heandler-error.js");

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
app.use(apiV1, imagesRoutes);
app.use(apiV1, talentsRoutes);
app.use(apiV1, eventsRoutes);
app.use(apiV1, organizersRoutes);
app.use(apiV1, authCMSRoutes);

// pastikan menyimpan kode ini di simpan di bawah kode route karen kode route harus di baca dan di jalan kan
// terlebih dahulu baru kode middleware maka jika terbalik maka akan error dan menghasilkan eror 404 not found
// middleware untuk menangani error
app.use(notFound);
// middleware untuk menangani route yang tidak ditemukan
app.use(errorHendlerMiddleware);

module.exports = app;
