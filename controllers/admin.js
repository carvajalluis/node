const Product = require("../models/product");

exports.GetAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    title: "Add product",
    path: "/add-product"
  });
};

exports.PostAddProduct = (req, res, next) => {
  let title = req.body.title
  let imgUrl = req.body.imgUrl
  let price = req.body.price
  let description = req.body.description
  let product = new Product(title, imgUrl,description, price );
  product.save();
  res.redirect("/");
};

exports.GetProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("admin/products", {
      products: products,
      title: "Product List",
      path: "/products"
    });
  });
};
