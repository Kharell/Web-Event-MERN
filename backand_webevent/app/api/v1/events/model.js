const mongoose = require("mongoose");

// Skema untuk tiket categories
const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Tipe tiket harus diisi"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

// Skema untuk events
const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Judul event harus diisi"],
      minlength: [3, "Panjang judul event minimal 3 karakter"],
      maxlength: [50, "Panjang judul event maksimal 50 karakter"],
    },
    date: {
      type: Date,
      required: [true, "Tanggal event harus diisi"],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, "Tagline event harus diisi"],
    },
    keyPoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, "Nama tempat acara event harus diisi"],
    },
    statusEvent: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    talents: {
      type: [mongoose.Types.ObjectId],
      ref: "Talent",
      required: true,
    },
  },
  { timestamps: true }
);

// Export model
module.exports = mongoose.model("Event", EventSchema);
