// Import modul express dan router
const express = require("express");
const router = express.Router();

// Import fungsi create dari controller
const { create } = require("./controller");

// Import middleware upload (multer)
const upload = require("../../../middlewares/multer");

// Route untuk upload satu gambar (field: avatar)
router.post("/images", upload.single("avatar"), create);

// Ekspor router
module.exports = router;
