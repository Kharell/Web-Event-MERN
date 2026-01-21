const express = require("express");
const router = express.Router();
const { Create, index, find, update, distroy } = require("./controller");
const {
  authenticateUser,
  //   authorizeRoles,
} = require("../../../middlewares/auth");

// get all data category
router.get("/categories", authenticateUser, index);

// delete data category berdasarkan id
router.post("/categories", Create);

// get one data category
router.get("/categories/:id", find);

// update data category bersasarkan id
router.put("/categories/:id", update);

// delete data category berdasarkan id
router.delete("/categories/:id", distroy);

module.exports = router;
