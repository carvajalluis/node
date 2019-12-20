"use strict";

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.product.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity =
      this.cart.items[cartProductIndex].quantity + 1;
  } else {
    updatedCartItems.push({
      product: product._id,
      quantity: 1
    });
  }
  this.cart = { ...this.cart, ...{ items: updatedCartItems } };
  return this.save();
};

userSchema.methods.removeFromCart = function(id) {
  this.cart.items = this.cart.items.filter(item => {
    return item.product.toString() !== id.toString();
  });

  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
