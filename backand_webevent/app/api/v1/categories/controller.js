const Categories = require("./model");

const Create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await Categories.create({ name });
    res.status(200).json({
      message: "Category Created",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Create,
};
