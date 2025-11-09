// Import express dan inisialisasi router
const express = require("express");
const router = express.Router();

// Import fungsi controller
const { create, index, find, update, destroy } = require("./controller");

// Route CRUD talents
router.post("/talents", create); // Tambah data talent
router.get("/talents", index); // Tampilkan semua talent
router.get("/talents/:id", find); // Tampilkan talent berdasarkan ID
router.put("/talents/:id", update); // Update talent berdasarkan ID
router.delete("/talents/:id", destroy); // Hapus talent berdasarkan ID

// Ekspor router
module.exports = router;
