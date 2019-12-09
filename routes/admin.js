const express = require("express");
const productsController = require("../controllers/products");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productsController.GetAddProduct);

// /admin/add-product => POST
router.post("/add-product", productsController.PostAddProduct);

module.exports = router;
