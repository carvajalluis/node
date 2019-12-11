const express = require("express");
const adminCtrl = require("../controllers/admin");

const shopCtrl = require("../controllers/shop");

const router = express.Router();

router.get("/", shopCtrl.GetIndex);

router.get("/products", shopCtrl.GetProducts);

router.get("/products/:id", shopCtrl.GetProduct);

router.get("/cart", shopCtrl.GetCart);

router.post("/add-to-cart", shopCtrl.PostAddToCart);

router.get("/orders", shopCtrl.GetOrders);

router.get("/checkout");

module.exports = router;
