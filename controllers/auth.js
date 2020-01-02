const { validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { addDays } = require("date-fns");
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

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    title: "Reset password",
    path: "/reset",
    errorMessage: req.flash("error")
  });
};

exports.getNewPassword = (req, res, next) => {
  const { token } = req.params;
  User.findOne({ resetToken: token, resetExpiration: { $gt: new Date() } })
    .then(user => {
      res.render("auth/new_password", {
        title: "Update your password",
        path: "/new_pass",
        errorMessage: req.flash("error"),
        token: token
      });
    })
    .catch(err => console.log(err));
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
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      title: "Signup",
      path: "/signup",
      errorMessage: errors.array().shift().msg
    });
  }
  bcrypt
    .genSalt(10)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hashedPassword => {
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

exports.postReset = (req, res, next) => {
  let email;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/auth/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({
      $or: [{ email: req.body.user }, { userName: req.body.user }]
    })
      .then(user => {
        if (!user) {
          req.flash(
            "error",
            `There is no record of ${req.body.user} in our store`
          );
          return res.redirect("/auth/reset");
        }
        email = user.email;
        user.resetToken = token;
        user.resetExpiration = addDays(new Date(), 1);
        return user.save();
      })
      .then(result => {
        res.redirect("/auth/login");
        return transport.sendMail({
          to: email,
          from: "shop@specbite.com",
          subject: "thank you for signing up!",
          html: `
          <h1>You requested a pasword reset</h1>
          <p>  we recieved a request  to reset the pasword of your account. 
          if you did not perform this request please contact support</p>
          <p>Click on the link below to complete the operation</p>
          <a href="http://localhost:3000/auth/reset/${token}">http://localhost:3000/auth/reset/${token}</a>
          </br>
          `
        });
      })
      .catch(err => console.log(err));
  });
};

exports.postNewPassword = (req, res, next) => {
  const { new_password, new_password_confirmation, token } = req.body;
  if (new_password !== new_password_confirmation) {
    req.flash("error", "pasword does not match confirmation");
    return res.redirect(`/auth/reset/${token}`);
  }
  let resetUser;

  User.findOne({ resetToken: token, resetExpiration: { $gt: new Date() } })
    .then(user => {
      resetUser = user;
      return bcrypt.genSalt(10);
    })
    .then(salt => {
      return bcrypt.hash(new_password, salt);
    })
    .then(hash => {
      resetUser.password = hash;
      resetUser.resetToken = undefined;
      resetUser.resetExpiration = undefined;
      return resetUser.save();
    })
    .then(() => {
      res.redirect("/auth/login");
    })
    .catch(err => console.log(err));
};
