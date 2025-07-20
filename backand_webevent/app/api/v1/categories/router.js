const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.status(200).json({
    message: "Welcome Page Categories",
  });
});

module.exports = router;
