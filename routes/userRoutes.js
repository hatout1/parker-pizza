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
    firstName,
    lastName,
    companyName,
    category,
    address,
    phoneNumber,
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
        role: "Admin",
        firstName,
        lastName,
        companyName,
        category,
        address,
        phoneNumber,
        userRelation: "Lead",
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
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, _id, role } });
    }
  }
);
userRouter.get("/all", (req, res) => {
  const wanted = req.params.username;
  User.find().then((results) => {
    res.json(results);
  });
});
userRouter.get("/all/:id", (req, res) => {
  if (req.params.id || req.params.id !== undefined) {
    User.findOne({ username: req.params.id }).then((results) => {
      res.json(results);
    });
  } else {
    return { username: "No Matching Data" };
  }
});

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    // res.clearCookie("userID");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "Admin" || "Manager") {
      res.status(200).json({
        message: { msgBody: "You have access to this data", msgError: false },
      });
    } else
      res.status(403).json({
        message: {
          msgBody:
            "Sorry! you're access level is not allowing you to get this information!",
          msgError: true,
        },
      });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = userRouter;
