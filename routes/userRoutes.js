const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport/passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { where } = require("../models/User");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "salesForce",
      sub: userID,
    },
    "salesForce",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const {
    username,
    password,
    email,
    role,
    firstName,
    lastName,
    companyName,
    category,
    address,
    phoneNumber,
    userRelation,
    city,
    state,
    zipcode,
  } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res
        .status(500)
        .json({ message: { msgBody: "User already exist", msgError: true } });
    else {
      const newUser = new User({
        username,
        password,
        email,
        role,
        firstName,
        lastName,
        companyName,
        category,
        address,
        phoneNumber,
        userRelation,
        city,
        state,
        zipcode,
      });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Email already exist", msgError: true },
          });
        else
          res
            .status(201)
            .json({ message: { msgBody: "User Created", msgError: false } });
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    console.log("line 50 login");
    if (req.isAuthenticated()) {
      console.log("line 52 login");

      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.cookie("userID", _id, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, _id } });
    }
    console.log("line 60 login");
  }
);
userRouter.get("/all", (req, res) => {
  const wanted = req.params.username;
  console.log(wanted);
  // User.findOne({ username: req.params.username }).then((results) => {
  User.find().then((results) => {
    res.json(results);
    console.log(results);
  });
});
userRouter.get("/all/:id", (req, res) => {
  console.log(req.params.id);
  if (req.params.id || req.params.id !== undefined) {
    User.findOne({ username: req.params.id }).then((results) => {
      res.json(results);
      console.log(results);
    });
  }
  console.log("undefined undefined undefined undefined undefined ");
});

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.clearCookie("userID");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

module.exports = userRouter;
