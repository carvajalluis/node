const express = require("express");
const productsCtrl = require("../controllers/products");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productsCtrl.GetAddProduct);

// /admin/add-product => POST
router.post("/add-product", productsCtrl.PostAddProduct);

module.exports = router;
