const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    role: {
      type: String,
      // jika inign tidak menetapkan atau mengisi maka akan di set dengan karakter _
      default: "_",
    },
    // untuk membuat relasi di mongodb kita perlu membuat type objectId
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Talents", talentsSchema);
