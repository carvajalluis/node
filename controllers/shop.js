const Product = require("../models/product");

exports.GetProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("shop/product-list", {
      products: products,
      title: "Shop",
      path: "/product-list"
    });
  });
};

exports.GetIndex = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("shop/index", {
      products: products,
      title: "Shop",
      path: "/"
    });
  });
}

exports.GetCart = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("shop/cart", {
      products: products,
      title: "Cart",
      path: "/cart"
    });
  });
}
