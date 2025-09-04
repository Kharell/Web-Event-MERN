/**
 * cara kerja untuk model gambar
 * 1. upload gambar
 * kita gunakan cara ini
 * jika user tidak ingin upload gambar
 * kita akan set gambar default
 * 2. generete url setelahsubmit baru kita simpan image ke db
 */

const Images = require("../../api/v1/images/model");

// cara ke 2
// const genereteUrlImage = async (req) => {
//   const result = `uploads/${req.file.filename}`;
//   return result;
// };

// cara ke 1
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  });
  return result;
};

// tambahkan functioncheking image
const chekingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) {
    throw new NotFoundError(`Tidak ada gambar dengan id: ${id}`);
  }
  return result;
};

module.exports = {
  // genereteUrlImage,
  createImages,
  chekingImage,
};
