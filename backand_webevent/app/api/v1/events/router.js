const express = require("express");
const router = express.Router();

const { create, index, find, update, destroy } = require("./controller");

// Route untuk membuat (create) event baru
router.post("/events", create);

// Route untuk mengambil semua data event
router.get("/events", index);

// Route untuk mengambil satu data event berdasarkan ID
router.get("/events/:id", find);

// Route untuk memperbarui data event berdasarkan ID
router.put("/events/:id", update);

// Route untuk menghapus data event berdasarkan ID
router.delete("/events/:id", destroy);

module.exports = router;
