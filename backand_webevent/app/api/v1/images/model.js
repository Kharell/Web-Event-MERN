const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let imageSchema = new Schema(
  {
    name: { type: string },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Image", imageSchema);
