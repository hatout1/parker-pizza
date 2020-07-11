const mongoose = require("mongoose");
const path = require("path");
const User = require("./User");
const Order = require("./Order");

const Schema = mongoose.Schema;

let invoiceSchema = new Schema({
  invoiceDate: {
    type: Date,
  },
  invoiceDueDate: {
    type: Date,
  },
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  ordersIncluded: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  totalAmount: {
    type: String,
  },
  taxes: {
    type: String,
  },
  paid: {
    type: Boolean,
  },
});

module.exports = ("Invoice", invoiceSchema);
