const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
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
  price: {
    familySize: {
      type: String,
    },
    mediumSize: {
      type: String,
    },
    smallSize: {
      type: String,
    },
  },
  rating: {
    type: Number,
  },
});

module.exports = ("Product", productSchema);
