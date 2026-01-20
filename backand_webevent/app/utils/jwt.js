const jwt = require("jsonwebtoken");
const { jwtScrest, jwtExpiration } = require("../config");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtScrest, {
    expiresIn: jwtExpiration,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtScrest);

module.exports = {
  createJWT,
  isTokenValid,
};
