const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFile = callback => {
  fs.readFile(p, (err, content) => {
    if (!err) {
      console.log(err);
      return callback(JSON.parse(content));
    }
    return callback([]);
  });
};
module.exports = class Product {
  constructor(title, imgUrl, description, price) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFile(products => {
      products = [...products, this];
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFile(callback);
  }
};
