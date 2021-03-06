const Product = require("../models/product");
const Order = require("../models/order");

exports.GetProducts = async (req, res, next) => {
  await Product.find()
    .then(products => {
      res.render("shop/products", {
        products: products,
        title: "Shop",
        path: "/products"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.GetProduct = async (req, res, next) => {
  const id = req.params.id;
  await Product.findById(id)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        title: `Product: ${product.title}`,
        path: "/products-detail"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.GetIndex = async (req, res, next) => {
  await Product.find()
    .then(products => {
      res.render("shop/products", {
        products: products,
        title: "Shop",
        path: "/products"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.GetCart = (req, res, next) => {
  req.user
    .populate("cart.items.product")
    .execPopulate()
    .then(user => {
      res.render("shop/cart", {
        products: user.cart.items,
        title: "Your Cart",
        path: "/cart"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.PostAddToCart = (req, res, next) => {
  Product.findById(req.body.id)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(() => {
      return res.redirect("/shop/cart");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.PostDeleteCartItem = (req, res, next) => {
  let { id } = req.body;
  req.user
    .removeFromCart(id)
    .then(() => {
      return res.redirect("/shop/cart");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.GetOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      console.log(orders);
      res.render("shop/orders", {
        orders: orders,
        title: "Your Orders",
        path: "/orders"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.PostOrder = (req, res, next) => {
  req.user
    .populate("cart.items.product")
    .execPopulate()
    .then(user => {
      const order = new Order({
        user: {
          userId: req.user._id
        },
        products: user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.product._doc } };
        })
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      console.log("Order Created!");
      res.redirect("/shop/orders");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
