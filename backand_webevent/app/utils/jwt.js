const jwt = require("jsonwebtoken");
const { jwtScrest, jawtExpiration } = require("../config");

const createJWT = ({ payload }) => {
  const tokrn = jwt.sign(payload, jwtScrest, {
    expiresIn: jawtExpiration,
  });
  return tokrn;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtScrest);

module.exports = {
  createJWT,
  isTokenValid,
};
