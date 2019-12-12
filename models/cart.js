const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static saveCartFile(cart) {
    fs.writeFile(p, JSON.stringify(cart), err => {
      console.log(err);
    });
  }

  static getCartFile = callback => {
    fs.readFile(p, (err, content) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        return callback(JSON.parse(content));
      }
      console.log(err);
      return callback(cart);
    });
  };

  static addProduct(id, price) {
    // fetch previous cart
    Cart.getCartFile(cart => {
      // find existing product
      const includdedProductIndex = cart.products.findIndex(p => p.id === id);
      const includdedProduct = cart.products[includdedProductIndex];
      let updatedProduct;

      // add new product or increase qty
      if (includdedProduct) {
        updatedProduct = { ...includdedProduct, qty: includdedProduct.qty + 1 };
        cart.products = [
          ...cart.products.slice(0, includdedProductIndex),
          updatedProduct,
          ...cart.products.slice(includdedProductIndex + 1)
        ];
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      // update cart price
      cart.totalPrice = cart.totalPrice + +price;
      Cart.saveCartFile(cart);
    });
  }

  static deleteProduct(id, price) {
    Cart.getCartFile(cart => {
      if (!cart.products) {
        return;
      }
      const { qty } = cart.products.find(p => p.id === id);
      const remainingProducts = cart.products.filter(p => p.id != id);
      cart = {
        products: [...remainingProducts],
        totalPrice: cart.totalPrice - +price * +qty
      };
      Cart.saveCartFile(cart);
    });
  }

  static fetchAll(callback) {
    this.getCartFile(callback);
  }
};
