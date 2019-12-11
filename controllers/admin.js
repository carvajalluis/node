const Product = require("../models/product");

exports.GetProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("admin/products", {
      products: products,
      title: "Product List",
      path: "/products"
    });
  });
};

exports.GetAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    title: "Add product",
    path: "/add-product",
    editMode: false
  });
};

exports.PostAddProduct = (req, res, next) => {
  let { title, imgUrl, price, description } = req.body;
  let product = new Product(null, title, imgUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};

exports.GetEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;
  if (!editMode) {
    return res.redirect("/products");
  }
  Product.findById(id, product => {
    if (!product) {
      return res.redirect("/products");
    }

    res.render("admin/edit-product", {
      title: `Edit ${product.title}`,
      path: "/edit-product",
      editMode: !!editMode,
      product: product
    });
  });
};

exports.PostEditProduct = (req, res, next) => {
  let { id, title, imgUrl, price, description } = req.body;
  let product = new Product(id, title, imgUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};

exports.PostDeleteProduct = (req, res, next) => {
  let {id} = req.body;
  Product.deleteById(id);
  res.redirect("/admin/products");
};
