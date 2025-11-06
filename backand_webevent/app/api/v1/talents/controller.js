const {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
} = require("../../../services/mongoose/talents");

const { StatusCodes } = require("http-status-codes");

// create atau posting data talents
const create = async (req, res, next) => {
  try {
    const result = await createTalents(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all data atau ambil semua data
const index = async (req, res, next) => {
  try {
    const result = await getAllTalents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get data berdasarkan id
const find = async (req, res, next) => {
  try {
    const result = await getOneTalents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Update atau edit data
const update = async (req, res, next) => {
  try {
    const result = await updateTalents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


// delete data talents
const destroy = async (req, res, next) => {
  try {
    const result = await deleteTalents(req);

    res.status(StatusCodes.OK).json({
      message:`Data dengan id ${req.params.id} berhasil dihapus`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
