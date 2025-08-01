const categories = require("../../api/v1/categories/model");
const { BadRequest } = require("../../errors");

// service untuk create / posting data categories
const createCategory = async (req) => {
  const { name } = req.body;
  // Cari categories dengan fild name
  const chechk = await categories.findOne({ name });
  // apa bila cech true / data categories sudah ada maka tampilkan error
  if (chechk) throw new BadRequest("Category Nama duplikat");

  const result = await categories.create({ name });

  return result;
};

// service untuk get all categories
const getAllCategories = async () => {
  const result = await categories.find({});
  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
};
