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
  constructor(t) {
    this.title = t;
  }

  save() {
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
