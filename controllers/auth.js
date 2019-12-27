const bcrypt = require("bcryptjs");
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
  const { user, password } = req.body;
  User.findOne({ $or: [{ email: user }, { userName: user }] })
    .then(user => {
      if (!user) {
        return res.redirect("/auth/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (match) {
            req.session.user = user;
            return req.session.save(() => res.redirect("/shop"));
          }

          res.redirect("/auth/login");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/auth/login");
        });
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
      let salt = bcrypt.genSaltSync(10);
      return bcrypt.hash(password, salt).then(hashedPassword => {
        const newUserName = email.split("@").shift();
        const newUser = new User({
          userName: newUserName,
          email: email,
          password: hashedPassword,
          cart: { items: [] },
          createdAt: Date(),
          updatedAt: Date()
        });
        return newUser.save();
      });
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
