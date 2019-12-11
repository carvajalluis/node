const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(id, title, imgUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  static saveProductFile(products) {
    fs.writeFile(p, JSON.stringify(products), err => {
      console.log(err);
    });
  }

  static getProductsFile = callback => {
    fs.readFile(p, (err, content) => {
      if (!err) {
        return callback(JSON.parse(content));
      }
      console.log(err);
      return callback([]);
    });
  };

  save() {
    this.getProductsFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        products = [
          ...products.slice(0, existingProductIndex),
          this,
          ...products.slice(existingProductIndex + 1)
        ];
      } else {
        this.id = Math.floor(Math.random() * (999 - 100 + 1) + 100).toString();
        products = [...products, this];
      }
      this.saveProductFile(products);
    });
  }

  static deleteById(id) {
    this.getProductsFile(products => {
      const existingProduct = products.filter(p => p.id != id);
      products = [...existingProduct];
      this.saveProductFile(products);
    });
  }

  static fetchAll(callback) {
    this.getProductsFile(callback);
  }

  static findById(id, callback) {
    this.getProductsFile(products => {
      const product = products.find(p => p.id === id);
      callback(product);
    });
  }
};
