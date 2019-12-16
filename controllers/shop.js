const { Product } = require("../models");

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
  await Product
    .then(products => {
      res.render("shop/index", {
        products: products,
        title: "Shop",
        path: "/"
      });
    })
    .catch(err => console.log(err));
};

exports.GetCart = (req, res, next) => {
  const cart = Cart.fetchAll(cart => {
    const products = Products.fetchAll(products => {
      const cartProducts = products
        .map(cp => ({
          product: cp,
          qty: cart.products.find(x => x.id === cp.id)
            ? cart.products.find(x => x.id === cp.id).qty
            : 0
        }))
        .filter(p => p.qty > 0);

      res.render("shop/cart", {
        products: products,
        title: "Cart",
        path: "/cart",
        products: cartProducts
      });
    });
  });
};

exports.PostAddToCart = (req, res, next) => {
  const id = req.body.id;
  Products.findById(id, product => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/shop/products");
};

exports.PostDeleteCartItem = (req, res, next) => {
  let { id, price } = req.body;
  Cart.deleteProduct(id, price);
  res.redirect("/shop/cart");
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
