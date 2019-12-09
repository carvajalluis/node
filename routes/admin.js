const express = require("express");
const productsController = require("../controllers/products");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productsController.GetAddProduct);
module.exports = router;
