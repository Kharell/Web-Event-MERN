const User = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createTokenUser, createJWT } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;

  // 1. Validasi input kosong
  if (!email || !password) {
    throw new BadRequestError("Mohon berikan email dan kata sandi");
  }

  // 2. Cari user berdasarkan email
  // PERBAIKAN: Menggunakan 'User' sesuai dengan variabel yang di-require di atas
  const result = await User.findOne({ email: email });

  // 3. Jika user tidak ditemukan
  if (!result) {
    throw new UnauthorizedError("email tidak valid");
  }

  // 4. Cek apakah password benar
  // Fungsi comparePassword ini berasal dari model yang kamu buat tadi
  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("pasword tidak valid");
  }

  // 5. Jika semua benar, buat Token
  const token = createJWT({ payload: createTokenUser(result) });

  return token;
};

module.exports = {
  signin,
};
