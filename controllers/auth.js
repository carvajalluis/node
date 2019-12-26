const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    path: "/login",
    isAuthenticated: req.session.user
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    title: "Signup",
    path: "/signup",
    isAuthenticated: req.session.user
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne({ userName: "carvajalluis" })
    .then(user => {
      req.session.user = user;
      req.session.save(() => res.redirect("/shop"));
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.redirect("auth/login");
      }
      const newUserName = email.split("@").shift();
      const newUser = new User({
        userName: newUserName,
        email: email,
        password: password,
        cart: { items: [] },
        createdAt: Date(),
        updatedAt: Date()
      });
      return newUser.save();
    })
    .then(user => {
      req.session.user = user;
      req.session.save(() => res.redirect("/shop"));
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => res.redirect("/shop"));
};
