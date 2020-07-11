const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

let OrderSchema = new Schema({
  Date: {
    type: Date,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  deleveryDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
  },
  orderAmount: {
    type: Number,
  },
  paid: {
    type: Boolean,
  },
  ordredBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = ("Order", OrderSchema);
