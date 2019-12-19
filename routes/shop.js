const express = require("express");
const shopCtrl = require("../controllers/shop");

const router = express.Router();

router.get("/", shopCtrl.GetIndex);

router.get("/products", shopCtrl.GetProducts);

router.get("/products/:id", shopCtrl.GetProduct);

router.get("/cart", shopCtrl.GetCart);

router.post("/add-to-cart", shopCtrl.PostAddToCart);

router.post("/delete-cart-item", shopCtrl.PostDeleteCartItem);

router.get("/orders", shopCtrl.GetOrders);

router.post("/order", shopCtrl.PostOrder);

router.get("/checkout");

module.exports = router;
