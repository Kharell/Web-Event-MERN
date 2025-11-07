const Events = require("../../api/v1/events/model");
const { checkingImage } = require("./images");
const { checkingCategories } = require("./categories");
const { checkingTalents } = require("./talents");
const { BadRequestError, NotFoundError } = require("../../errors");

// 1. Service untuk get semua events
const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }
  if (category) {
    condition = { ...condition, category };
  }
  if (talent) {
    condition = { ...condition, talents: talent };
  }

  const result = await Events.find(condition)
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talents",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  return result;
};

// 2. Service untuk membuat (create) event baru
const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talents,
  } = req.body;

  // Validasi foreign key
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talents);

  // Cek apakah judul sudah ada
  const check = await Events.findOne({ title });
  if (check) throw new BadRequestError("Judul acara event sudah terdaftar");

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talents,
  });

  return result;
};

// 3. Service untuk get satu event berdasarkan ID
const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id })
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talents",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

  return result;
};

// 4. Service untuk update event berdasarkan ID
const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talents,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talents);

  // Cek apakah nama event sudah dipakai oleh event lain
  const check = await Events.findOne({ title, _id: { $ne: id } });
  if (check) throw new BadRequestError("Judul acara event sudah terdaftar");

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talents,
    },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);
  return result;
};

// 5. Service untuk menghapus event berdasarkan ID
const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

  await result.deleteOne();
  return result;
};

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
};
