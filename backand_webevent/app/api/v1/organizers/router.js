const express = require("express");
const router = express.Router();
const { createCMSOrganizer, createCMSUsers } = require("./controller");

const {
  authenticateUser,
  //   authorizeRoles,
} = require("../../../middlewares/auth");

// Route untuk membuat organizer baru
router.post("/organizers", createCMSOrganizer);
router.post("/users", authenticateUser, createCMSUsers);

module.exports = router;
