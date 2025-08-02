const Categories = require("../../api/v1/categories/model");
const { BadRequestError } = require("../../errors");

// service untuk get all categories
const getAllCategories = async () => {
  const result = await Categories.find({});
  return result;
};

// service untuk create atau posting data categories
const createCategories = async (req) => {
  const { name } = req.body;
  // Cari categories dengan fild name
  const chechk = await Categories.findOne({ name });
  // apa bila cech true / data categories sudah ada maka tampilkan error
  if (chechk) throw new BadRequestError("Category Nama duplikat");

  const result = await Categories.create({ name });

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
};
