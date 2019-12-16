const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorCtrl = require("./controllers/error");
var { User } = require("./models");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use(errorCtrl.get404);

app.listen(3000);
