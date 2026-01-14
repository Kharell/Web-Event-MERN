const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizerSchema = Schema(
  {
    organizers: {
      // Field ini yang akan menyimpan nama penyelenggara
      type: String,
      required: [true, "Penyelenggara harus diisi"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Organizer", organizerSchema);
