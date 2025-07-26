const Categories = require("./model");

// create atau posting data
const Create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await Categories.create({ name });
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
    const result = await Categories.find().select("_id name");
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
    const result = await Categories.findOne({ _id: id });

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

module.exports = {
  Create,
  index,
  find,
};
