const multer = require("multer");

// Konfigurasi penyimpanan (storage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 99999999) + "-" + file.originalname);
  },
});

// Filter file yang diizinkan
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Format file harus JPEG, PNG, atau JPG"), false);
  }
};

// Middleware upload
const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 30000000,
  },
  fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
