const express = require("express");
const router = express.Router();
const { create } = require("./controller");

const upload = require("../../../middlewares/multer");

router.post("/images", upload.single("Img Avatar"), create);

module.exports = router;
