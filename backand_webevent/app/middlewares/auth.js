const { UnauthorizedError, UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Validasi keberadaan Bearer token di header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthenticatedError("Authentication invalid"));
  }

  const token = authHeader.split(" ")[1];
  // console.log("Token yang di dapat dari organiser adalah : ", token);
  try {
    // 2. Verifikasi token
    const payload = isTokenValid({ token });

    // console.log("Data user terbaru adalah : ", payload);

    // 3. Lampirkan data user ke object request (req.user)
    req.user = {
      email: payload.email,
      role: payload.role,
      name: payload.name,
      organizer: payload.organizer,
      id: payload.userId,
    };

    next();
  } catch (error) {
    // Menangani error jika token expired atau tidak valid
    next(new UnauthenticatedError("Authentication invalid"));
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Periksa apakah role user ada dalam daftar role yang diizinkan
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
};
