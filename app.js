const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorCtrl = require("./controllers/error");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5dfc0381c2aa67433040086d")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use(errorCtrl.get404);
mongoose
  .connect(
    "mongodb+srv://admin:x8IG7iS4L9aYqtf3@cluster0-yf21k.mongodb.net/shop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    // const user = new User({
    //   userName: "carvajalluis",
    //   password: "qwerty",
    //   email: "luisalbcarvajal@gmail.com",
    //   cart: {
    //     items: []
    //   },
    //   createdAt: Date(),
    //   updatedAt: Date()
    // });
    // user.save();
    app.listen(3000);
  })
  .catch(err => console.log(err));
