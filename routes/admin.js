const express = require("express");
const adminCtrl = require("../controllers/admin");

const router = express.Router();

router.get("/products", adminCtrl.GetProducts);

router.get("/add-product", adminCtrl.GetAddProduct);

router.get("/edit-product/:id", adminCtrl.GetEditProduct);

router.post("/add-product", adminCtrl.PostAddProduct);

router.post("/edit-product", adminCtrl.PostEditProduct);

router.post("/delete-product", adminCtrl.PostDeleteProduct);

module.exports = router;
