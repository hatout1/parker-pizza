const mongoose = require("mongoose");

const Order = require("./Order");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  role: {
    type: String,
    enum: ["Admin", "Manager", "Customer"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  category: {
    type: String,
    //personal, company
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  phoneNumber: {
    type: String,
  },
  userRelation: {
    type: String,
    //Lead, Opportunity, Contact, Account
  },
  userOrders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
