const express = require("express");
const router = express.Router();
const { Create, index, find, update, distroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

// get all data category
router.get("/categories", authenticateUser, authorizeRoles("organizer"), index);

// create atau posting data category
router.post(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  Create,
);

// get one data category
router.get(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  find,
);

// update data category bersasarkan id
router.put(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update,
);

// delete data category berdasarkan id
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  distroy,
);

module.exports = router;
