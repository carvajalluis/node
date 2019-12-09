const products = [];

exports.GetAddProduct = (req, res, next) => {
  res.render("add-product", {
    title: "Add-Product",
    path: "/admin/add-product"
  });
};

exports.PostAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.GetProducts = (req, res, next) => {
  res.render("shop", {
    products: products,
    title: "Shop",
    path: "/"
  });
};

exports.products = products;
