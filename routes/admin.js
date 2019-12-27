const express = require("express");
const adminCtrl = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/products", adminCtrl.GetProducts);

router.get("/add-product", isAuth, adminCtrl.GetAddProduct);

router.get("/edit-product/:id", isAuth, adminCtrl.GetEditProduct);

router.post("/add-product", isAuth, adminCtrl.PostAddProduct);

router.post("/edit-product", isAuth, adminCtrl.PostEditProduct);

router.post("/delete-product", isAuth, adminCtrl.PostDeleteProduct);

module.exports = router;
