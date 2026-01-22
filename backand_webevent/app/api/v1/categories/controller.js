const { StatusCodes } = require("http-status-codes");

// import service untuk categories
const {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");

// create atau posting data categories
const Create = async (req, res, next) => {
  try {
    const result = await createCategories(req);
    res.status(StatusCodes.CREATED).json({
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
    const result = await getAllCategories(req);
    res.status(StatusCodes.OK).json({
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
    const result = await getOneCategories(req);

    res.status(StatusCodes.OK).json({
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
    const result = await updateCategories(req);
    res.status(StatusCodes.OK).json({
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
    const result = await deleteCategories(req);
    res.status(StatusCodes.OK).json({
      message: `Data dengan id ${req.params.id} berhasil dihapus`,
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
