const Categories = require("./model");
const { createCategory, getAllCategories } = require("../../../services/mongoose/categories");

// create atau posting data categories
const Create = async (req, res, next) => {
  try {
    const result = await createCategory(req);
    res.status(201).json({
      message: "Category Created",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all data atau ambil semua data
const index = async (req, res, next) => {
  try {
    const result = await getAllCategories();
    res.status(200).json({
      message: "Get all data Category ",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get data berdasarkan id
const find = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findOne({ _id: id }).select("_id name");

    // log eror sementara jika data id salah atau kosong
    if (!result) {
      return res.status(404).json({
        message: "Data Category tidak di temukan",
      });
    }

    res.status(200).json({
      message: "Get data berdasarkan id Category",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Update atau edit data category
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await Categories.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Update data Category",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Delete data category
const distroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Categories.findOneAndDelete({ _id: id });
    if (!result) {
      return res.status(404).json({
        message: "Data Category tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "Data Category berhasil dihapus",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Create,
  index,
  find,
  update,
  distroy,
};
