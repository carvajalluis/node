const { Product, User } = require("../models");

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
    .then(cart => {
      createCart(cart, req);
      return cart.getProducts();
    })
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
    .then(cart => {
      createCart(cart, req);
      fetchedCart = cart;
      return cart.getProducts({ where: { id: id } });
    })
    .then(products => {
      if (!products) {
        qty = 1;
        return Product.findByPk(id);
      } else {
        if (products.length) {
          qty = fetchedCart.CartItem.quantity + 1;
        }
      }

      return Product.findByPk(id);
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
    .then(cart => {
      createCart(cart, req);
      return cart.getProducts({ where: { id: id } });
    })
    .then(products => products[0].CartItem.destroy())
    .then(() => {
      return res.redirect("/shop/cart");
    })
    .catch(err => console.log(err));
};

exports.GetOrders = (req, res, next) => {
  const products = Products.fetchAll(products => {
    res.render("shop/orders", {
      products: products,
      title: "Your Orders",
      path: "/orders"
    });
  });
};

function createCart(cart, req) {
  if (!cart) {
    req.user.createCart();
    User.findByPk(req.user.id).then(user => ({ ...req.user, ...user }));
    console.log(`new cart created for ${req.user.userName}`);
  }
}
