const Product = require("../models/product");
const Cart = require("../models/cart");

exports.GetProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("shop/products", {
      products: products,
      title: "Shop",
      path: "/products"
    });
  });
};

exports.GetProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id, product => {
    res.render("shop/product-detail", {
      product: product,
      title: `Product: ${product.title}`,
      path: "/products-detail"
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
};

exports.GetCart = (req, res, next) => {
  const cart = Cart.fetchAll(cart => {
    const products = Product.fetchAll(products => {
      const cartProducts = products
        .map(cp => ({
          product: cp,
          qty: cart.products.find(x => x.id === cp.id)
            ? cart.products.find(x => x.id === cp.id).qty
            : 0
        }))
        .filter(p => p.qty > 1);

      res.render("shop/cart", {
        products: products,
        title: "Cart",
        path: "/cart",
        cartProducts: cartProducts
      });
    });
  });
};

exports.PostAddToCart = (req, res, next) => {
  const id = req.body.id;
  Product.findById(id, product => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/shop/products");
};

exports.GetOrders = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("shop/orders", {
      products: products,
      title: "Your Orders",
      path: "/orders"
    });
  });
};
