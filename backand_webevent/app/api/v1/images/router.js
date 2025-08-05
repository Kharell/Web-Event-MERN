const express = require("express");
const router = express.Router();
const { create } = require("./controller");

router.post("/images", create);

module.exports = router;
