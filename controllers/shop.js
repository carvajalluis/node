const Product = require("../models/product");

exports.GetProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("shop/products", {
      products: products,
      title: "Shop",
      path: "/products"
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

exports.GetOrders = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("shop/orders", {
      products: products,
      title: "Your Orders",
      path: "/orders"
    });
  });
}

