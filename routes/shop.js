const express = require("express");
const adminCtrl = require("../controllers/admin");

const shopCtrl = require("../controllers/shop");

const router = express.Router();

router.get("/", shopCtrl.GetIndex);

router.get("/products", shopCtrl.GetProducts);

router.get("/cart", shopCtrl.GetCart);

router.get("/checkout");

module.exports = router;
