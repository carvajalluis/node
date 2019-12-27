const express = require("express");
const shopCtrl = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopCtrl.GetIndex);

router.get("/products", shopCtrl.GetProducts);

router.get("/products/:id", shopCtrl.GetProduct);

router.get("/cart", isAuth, shopCtrl.GetCart);

router.post("/add-to-cart", isAuth, shopCtrl.PostAddToCart);

router.post("/delete-cart-item", isAuth, shopCtrl.PostDeleteCartItem);

router.get("/orders", isAuth, shopCtrl.GetOrders);

router.post("/order", isAuth, shopCtrl.PostOrder);

module.exports = router;
