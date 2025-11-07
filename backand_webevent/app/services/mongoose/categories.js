const Categories = require("../../api/v1/categories/model");

// import custom error not found dan bad request
const { BadRequestError, NotFoundError } = require("../../errors");

//1. service untuk get all categories
const getAllCategories = async () => {
  const result = await Categories.find({});
  return result;
};

//2. service untuk create atau posting data categories
const createCategories = async (req) => {
  const { name } = req.body;
  // Cari categories dengan fild name
  const chechk = await Categories.findOne({ name });
  // apa bila cech true / data categories sudah ada maka tampilkan error
  if (chechk) throw new BadRequestError("Category Nama duplikat");

  const result = await Categories.create({ name });

  return result;
};

//3. service untuk get  categories by id atau find one data categories
const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });
  if (!result) {
    throw new NotFoundError(`Tidak ada categories dengan id: ${id} `);
  }
  return result;
};

//4. service untuk update categories
const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // Cari categories dengan fild name dan idselain yang di kirim dari params
  // fungsi dari kode $ne adalah untuk mengecualikan id yang sedang di update dan mencari id lain yang sama
  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
  });
  // apa bila cech true / data categories sudah ada maka tampilkan error
  if (check)
    throw new BadRequestError(
      "Category Nama duplikat atau sudah ada data yang sama"
    );

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );
  if (!result) {
    throw new NotFoundError(`Tidak ada categories dengan id: ${id} `);
  }
  return result;
};

// 5. service untuk delete categories
const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`Tidak ada categories dengan id: ${id}`);
  }

  // hapus berdasarkan id categories
  await Categories.deleteOne({ _id: id });
  return result;
};

// service untuk checking categories berdasarkan id
const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada categories dengan id: ${id}`);
  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
