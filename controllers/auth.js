const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const User = require("../models/user");

const transport = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    path: "/login",
    errorMessage: req.flash("error")
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    title: "Signup",
    path: "/signup",
    errorMessage: req.flash("error")
  });
};

exports.postLogin = (req, res, next) => {
  const { user, password } = req.body;
  User.findOne({ $or: [{ email: user }, { userName: user }] })
    .then(user => {
      if (!user) {
        req.flash("error", "invalid email/username or password");
        return res.redirect("/auth/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (match) {
            req.session.user = user;
            return req.session.save(() => res.redirect("/shop"));
          }
          req.flash("error", "Invalid email or password");
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
        req.flash("error", "Email already been used");
        return res.redirect("/auth/signup");
      } else {
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
      }
    })
    .then(user => {
      if (user) {
        req.session.user = user;
        req.session.save(() => res.redirect("/shop"));
        return transport.sendMail({
          to: user.email,
          from: "shop@specbite.com",
          subject: "thank you for signing up!",
          html: "<h1>You succesfully signed up</h1>"
        });
      }
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => res.redirect("/shop"));
};
