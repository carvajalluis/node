const Product = require("../models/product");

exports.GetAddProduct = (req, res, next) => {
  res.render("add-product", {
    title: "Add-Product",
    path: "/admin/add-product"
  });
};

exports.PostAddProduct = (req, res, next) => {
  let product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.GetProducts = (req, res, next) => {
  const products = Product.fetchAll();
  console.log(products)
  res.render("shop", {
    products: products,
    title: "Shop",
    path: "/"
  });
};
