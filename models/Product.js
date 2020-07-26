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
  productImage: {
    type: String,
  },
  ingredient: {
    type: String,
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
