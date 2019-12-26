const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorCtrl = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://admin:x8IG7iS4L9aYqtf3@cluster0-yf21k.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();

const store = new MongoDBStore(
  {
    uri: MONGODB_URI,
    collection: "sessions"
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

store.on("error", err => {
  if (err) {
    console.log(err);
  }
});

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "8p6*0FNV*xXg",
    resave: true,
    saveUninitialized: true,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);
app.use(errorCtrl.get404);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
