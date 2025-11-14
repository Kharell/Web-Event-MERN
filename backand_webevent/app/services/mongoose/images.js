/**
 * Cara kerja untuk model gambar:
 * 1. Upload gambar
 *    - Jika user tidak upload gambar, kita set gambar default.
 * 2. Generate url setelah submit lalu simpan image ke DB.
 */

const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

// CREATE IMAGE (UPLOAD / DEFAULT)
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  });

  return result;
};

// CEK GAMBAR BERDASARKAN ID
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`Tidak ada gambar dengan id: ${id}`);
  }

  return result;
};

module.exports = {
  createImages,
  checkingImage,
};
