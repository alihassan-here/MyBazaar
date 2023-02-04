const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      required: true,
      type: Number,
    },
    stock: {
      required: true,
      type: Number,
    },
    discount: {
      type: Number,
      required: true,
    },
    category: {
      required: true,
      type: String,
    },
    colors: {
      type: [Map],
    },
    sizes: {
      type: [Map],
    },
    price: {
      required: true,
      type: Number,
    },
    image1: {
      required: true,
      type: String,
    },
    image2: {
      required: true,
      type: String,
    },
    image3: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
