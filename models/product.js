let products = [];
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    products = { ...products, this: this };
  }
  static fetchAll() {
    return products;
  }
};
