const express = require("express");
const router = express.Router();
const { Create, index, find } = require("./controller");

// get al data category
router.get("/categories", index);

// get one data category
router.get("/categories/:id", find);

router.post("/categories", Create);

module.exports = router;
