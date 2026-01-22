const { StatusCodes } = require("http-status-codes");
const {
  createOrganizers,
  createUsers,
} = require("../../../services/mongoose/users");

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizers(req);

    res.status(StatusCodes.CREATED).json({
      message: "Organizer Berhasil Created",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const createCMSUsers = async (req, res, next) => {
  try {
    const result = await createUsers(req);

    res.status(StatusCodes.CREATED).json({
      message: "User Berhasil Created",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCMSOrganizer,
  createCMSUsers,
};
