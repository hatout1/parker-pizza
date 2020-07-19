const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Invoice = require("./Invoice");
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
  addedToInvoice: {
    type: Boolean,
  },
  ordredBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  invoice: [
    {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
  ],
  includedOnInvoice: {
    type: Boolean,
  },
});

module.exports = ("Order", OrderSchema);
