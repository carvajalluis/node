const { Product, Order } = require("../models");

exports.GetProducts = async (req, res, next) => {
  const products = await Product.findAll()
    .then(products => {
      res.render("shop/products", {
        products: products,
        title: "Shop",
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.GetProduct = async (req, res, next) => {
  const id = req.params.id;
  await Product.findByPk(id)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        title: `Product: ${product.title}`,
        path: "/products-detail"
      });
    })
    .catch(err => console.log(err));
};

exports.GetIndex = async (req, res, next) => {
  await Product.then(products => {
    res.render("shop/index", {
      products: products,
      title: "Shop",
      path: "/"
    });
  }).catch(err => console.log(err));
};

exports.GetCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => initializeCart(cart, req))
    .then(cart => cart.getProducts())
    .then(products =>
      res.render("shop/cart", {
        products: products,
        title: "Your Cart",
        path: "/cart"
      })
    )
    .catch(err => console.log(err));
};

exports.PostAddToCart = (req, res, next) => {
  const id = req.body.id;
  let fetchedCart;
  let qty;
  req.user
    .getCart()
    .then(cart => initializeCart(cart, req))
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: id } });
    })
    .then(products => {
      let product;
      if (products.length) {
        product = products[0];
      }
      if (product) {
        qty = product.CartItem.quantity + 1;
        return product;
      } else {
        qty = 1;
        return Product.findByPk(id);
      }
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: qty }
      });
    })
    .then(() => {
      return res.redirect("/shop/cart");
    })
    .catch(err => console.log(err));

  const { userName, userId } = req.user;
};

exports.PostDeleteCartItem = (req, res, next) => {
  let { id } = req.body;
  req.user
    .getCart()
    .then(cart => initializeCart(cart, req))
    .then(cart => {
      return cart.getProducts({ where: { id: id } });
    })
    .then(products => products[0].CartItem.destroy())
    .then(() => {
      return res.redirect("/shop/cart");
    })
    .catch(err => console.log(err));
};

exports.GetOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["Products"] })
    .then(orders => {
      res.render("shop/orders", {
        orders: orders,
        title: "Your Orders",
        path: "/orders"
      });
    })
    .catch(err => console.log(err));
};

exports.PostOrder = (req, res, next) => {
  let cartProducts;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      cartProducts = products;
      return req.user.createOrder();
    })
    .then(order => {
      return order.addProducts(
        cartProducts.map(product => {
          product.OrderItem = { quantity: product.CartItem.quantity };
          return product;
        })
      );
    })
    .then(() => {
      fetchedCart.setProducts(null);
      return res.redirect("/shop/orders");
    })
    .catch(err => console.log(err));
};

initializeCart = async (cart, req) => {
  if (!cart) {
    await req.user.createCart();
    await req.user.reload();
    console.log(`New cart created for ${req.user.userName}`);
    return req.user.getCart();
  }
  return cart;
};
