// import model talents
const Talents = require("../../api/v1/talents/model");
const { chekingImage } = require("./images");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = {};
  if (keyword) {
    // gunakan regex untuk pencarian mirip dengan mengetikan huruf apa saja data akan muncul tanpa harus sama dengan penulisan data aslinya
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  const result = await Talents.find(condition)
    // gunakan populate untuk menampilkan data relasi dari collection image dan secara tidak langsung membuat relasi
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  // cek image berdasarkan field image
  await chekingImage(image);

  // cek apakah talents dengan field name sudah ada
  const check = await Talents.findOne({ name });

  if (check) {
    throw new BadRequestError("Pembicara sudah terdaftar");
  }

  const result = await Talents.create({
    name,
    role,
    image,
  });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);
  }

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  // cek image berdasarkan field image
  await chekingImage(image);

  // cek talents dengan field name selain id yang dikirim
  const check = await Talents.findOne({ name, _id: { $ne: id } });

  if (check) {
    throw new BadRequestError("Pembicara sudah terdaftar");
  }

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, role, image },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);
  }

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;
  const result = await Talents.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);
  }

  await result.remove();
  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
};
