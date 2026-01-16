const jwt = require('jsonwebtoken');
const { jwtScrest, jawtExpiration } = require('../config');

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, jwtScrest, {
        expiresIn: jawtExpiration,
    });
    return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtScrest);

module.exports = {
    createJWT,
    isTokenValid,
};