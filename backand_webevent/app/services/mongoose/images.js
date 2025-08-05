/**
 * cara kerja untuk model gambar
 * 1. upload gambar
 * kita gunakan cara ini
 * 2. generete url setelahsubmit baru kita simpan image ke db
 */

const Images = require("../../api/v1/images/model");

// gunakan cara ini untuk pertama
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.png`,
  });
  return result;
};

// gunakan cara ini untuk kedua
const genereteUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;
  return result;
};

module.exports = {
    createImages,
    genereteUrlImage
};
