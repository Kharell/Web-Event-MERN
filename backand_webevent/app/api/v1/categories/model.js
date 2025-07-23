const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
    {
        name: {
        type: String,
        minlength: [3, 'panjang nama kategori minimal 3 karakter'],
        maxLength: [20, 'panjang nama kategori maksimal 20 karakter'],
        required: [true, 'nama kategori harus diisi'],
    },
    },
    {
        timestamps: true,
    },
);

module.exports = model("Category", categorySchema);