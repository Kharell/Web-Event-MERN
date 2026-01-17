// 1. Import mongoose
const mongoose = require("mongoose");

// 2. Import konfigurasi terkait MongoDB dari app/config/index.js
const { urlDB } = require("../config"); // Perbaiki penulisan "connfig"

// 3. Konek ke MongoDB menggunakan URL yang benar
mongoose.connect(urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 4. Simpan koneksi ke dalam constant db
const db = mongoose.connection;

// 5. Tambahkan event listener untuk error dan success
db.on("error", (err) => console.error("connection error:", err));
db.once("open", () =>
  console.log("MongoDB connected successfully in port" + urlDB),
);

// 6. Export db supaya bisa digunakan
module.exports = db;
