const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  urlDB: process.env.URL_MONGODB_DEV,
  jwtExpiration: "24h",
  jwtScrest: "jwtSecret",
};
