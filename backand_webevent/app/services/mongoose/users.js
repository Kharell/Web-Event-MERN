const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizers = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError(
      "Password dan Confirm Password tidak sesuai silahkan coba lagi",
    );
  }

  // create organiser
  const result = await Organizers.create({ organizers: organizer });

  // create Users
  const users = await Users.create({
    role,
    email,
    name,
    password,
    organizer: result._id, // Relasi ID
  });

  // delete password dari response agar tidak tampil di client
  delete users._doc.password;

  return users;
};

// create users
const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError(
      "Password dan Confirm Password tidak sesuai silahkan coba lagi",
    );
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

module.exports = {
  createOrganizers,
  createUsers,
};
