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
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

// Middleware upload
const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB
  },
  fileFilter, // ← perhatikan: bukan `filterFile`
});

module.exports = uploadMiddleware;
