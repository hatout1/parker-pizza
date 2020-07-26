const express = require("express");
const router = express.Router();
const path = require("path");
const Order = require("../models/Order");
const Invoice = require("../models/Invoice");
const { update } = require("../models/Product");
// const { where } = require("../models/Product");

//**** Multer ******/
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
const Product = require("../models/Product");

// ******* Admin paths ******
router.post("/admin/addProduct", (req, res) => {});

// ******* Products paths *****
router.get("/allProducts/:id", (req, res) => {
  // const category = req.params.id
  Product.find({ category: req.params.id }).then((products) => {
    res.json(products);
  });
});

router.get("/Products", (req, res) => {
  // const category = req.params.id
  Product.find().then((products) => {
    res.json(products);
  });
});

router.get("/showInvoice", (req, res) => {
  Invoice.find({ client: "user" }).then((invoice) => {
    res.json(invoice);
  });
});

// update Invoice for payment
router.put("/updateInvoice", (req, res) => {
  const id = req.body._id;
  Invoice.findOneAndUpdate({ _id: id }, update, { paid: true }).then(
    (invoice) => {
      res.json(invoice);
    }
  );
});

router.post("/submitOrder", (req, res) => {
  Order.create();
});

router.post("/ProductsSetting", upload.single("image"), (req, res) => {
  const {
    productTitle,
    category,
    description,
    ingredient,
    familySizePrice,
    mediumSizePrice,
    smallSizeProce,
    familySizeCost,
    mediumSizeCost,
    smallSizeCost,
  } = req.body;
  const { image } = req.body;
  console.log(req.body);

  Product.findOne({ productTitle }, (err, product) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (product)
      res.status(500).json({
        message: { msgBody: "Product already exists", msgError: true },
      });
    else {
      console.log("line 45");
      const newProduct = new Product({
        productTitle,
        category,
        description,
        image,
        ingredient,
        familySizePrice,
        mediumSizePrice,
        smallSizeProce,
        familySizeCost,
        mediumSizeCost,
        smallSizeCost,
      });
      newProduct.save((err) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Error Occured while adding this product",
              msgError: true,
            },
          });
        else
          res
            .status(201)
            .json({ message: { msgBody: "Product Created", msgError: false } });
      });
    }
  });
});

module.exports = router;
