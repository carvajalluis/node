const express = require("express");
const adminCtrl = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminCtrl.GetAddProduct);

router.get("/product-list", adminCtrl.GetProducts);

router.post("/add-product", adminCtrl.PostAddProduct);


module.exports = router;
