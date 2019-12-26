const Product = require("../models/product");

exports.GetProducts = async (req, res, next) => {
  await Product.find()
    .then(products => {
      res.render("admin/products", {
        products: products,
        title: "Product List",
        path: "/products",
        isAuthenticated : req.session.user
      });
    })
    .catch(err => console.log(err));
};

exports.GetAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    title: "Add product",
    path: "/add-product",
    editMode: false,
    isAuthenticated : req.session.user
  });
};

exports.GetEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;
  if (!editMode) {
    return res.redirect("/products");
  }
  await Product.findById(id)
    .then(product => {
      if (!product) {
        return res.redirect("/admin/products");
      }

      res.render("admin/edit-product", {
        title: `Edit ${product.title}`,
        path: "/edit-product",
        editMode: !!editMode,
        product: product,
        isAuthenticated : req.session.user
      });
    })
    .catch(err => console.log(err));
};

exports.PostAddProduct = async (req, res, next) => {
  let { title, imageUrl, price, description } = req.body;

  const product = new Product({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    userId: req.user,
    createdAt: Date(),
    updatedAt: Date()
  });
  product
    .save()
    .then(() => {
      console.log("Product created!");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.PostEditProduct = async (req, res, next) => {
  let { id, title, imageUrl, price, description } = req.body;

  await Product.findById(id)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;

      return product.save();
    })
    .then(() => {
      console.log("Product updated!");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.PostDeleteProduct = async (req, res, next) => {
  let { id } = req.body;
  await Product.findByIdAndRemove(id)
    .then(() => {
      console.log("Product destroyed!");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
