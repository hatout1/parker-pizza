const express = require("express");
const router = express.Router();
const path = require("path");
const Product = require("../models/Product");

// ******* Admin paths ******
router.post("/admin/addProduct", (req, res) => {});

// ******* Products paths *****
router.get("/allProducts", (req, res) => {});

router.get("/showInvoice", (req, res) => {});

router.post("/updateInvoice", (req, res) => {});

router.post("/submitOrder", (req, res) => {});

router.post("/ProductsSetting", (req, res) => {
  const {
    name,
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
  } = req.body;
  console.log(req.body);
  Product.findOne({ productTitle }, (err, product) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(500).json({
        message: { msgBody: "Product already exists", msgError: true },
      });
    else {
      const newProduct = new Product({
        name,
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
