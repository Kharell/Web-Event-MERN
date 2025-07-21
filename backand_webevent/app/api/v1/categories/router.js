const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.status(200).json({
    message: "Welcome Page Categories",
  });
});

router.get("/nama", (req, res) => {
  res.status(200).json({
    message: "Welcome Page Nama Categories",
  });
});

module.exports = router;
