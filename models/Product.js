const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  productTitle: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  ingredient: {
    type: Array,
  },
  familySizePrice: {
    type: String,
  },
  mediumSizePrice: {
    type: String,
  },
  smallSizePrice: {
    type: String,
  },
  familySizeCost: {
    type: String,
  },
  mediumSizeCost: {
    type: String,
  },
  smallSizeCost: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = ("Product", productSchema);
