const express = require("express");
const router = express.Router();
const path = require("path");

// ******* Admin paths ******
router.post("/admin/addProduct", (req, res) => {});

// ******* Products paths *****
router.get("/allProducts", (req, res) => {});

router.get("/showInvoice", (req, res) => {});

router.post("/updateInvoice", (req, res) => {});

router.post("/submitOrder", (req, res) => {});

module.exports = router;
