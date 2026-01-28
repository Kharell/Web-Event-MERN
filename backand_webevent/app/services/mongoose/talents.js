// import model talents
const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

// 0. CEK TALENTS BERDASARKAN ID
const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);
  }

  return result;
};

// 1. GET ALL TALENTS
const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = {
      ...condition,
      name: { $regex: keyword, $options: "i" },
    };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

// 2. CREATE TALENT
const createTalents = async (req) => {
  const { name, role, image } = req.body;

  // cek image
  await checkingImage(image);

  // cek duplicate talent berdasarkan name
  const check = await Talents.findOne({ name, organizer: req.user.organizer });
  if (check) {
    throw new BadRequestError("Pembicara sudah terdaftar");
  }

  const result = await Talents.create({
    name,
    role,
    image,
    organizer: req.user.organizer,
  });

  return result;
};

// 3. GET TALENT BY ID
const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id, organizer: req.user.organizer });
  if (!result) {
    throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);
  }

  return result;
};

// 4. UPDATE TALENT
const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  // cek image
  await checkingImage(image);

  // cek name selain id yang sedang diupdate
  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) {
    throw new BadRequestError("Pembicara sudah terdaftar");
  }

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, role, image, organizer: req.user.organizer },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);
  }

  return result;
};

// 5. DELETE TALENT
const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id, organizer: req.user.organizer });
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
  checkingTalents, // WAJIB: dipakai oleh events
};
