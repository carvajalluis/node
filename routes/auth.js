const express = require("express");
const { check, body } = require("express-validator");
const authCtrl = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const User = require("../models/user");
const router = express.Router();

router.get("/login", authCtrl.getLogin);
router.get("/reset/:token", authCtrl.getNewPassword);
router.get("/reset", authCtrl.getReset);
router.get("/signup", authCtrl.getSignup);
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
  ],
  authCtrl.postLogin
);
router.post("/logout", isAuth, authCtrl.postLogout);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({
          $or: [{ email: value }, { userName: value.split("@").shift() }]
        }).then(user => {
          if (user) {
            return Promise.reject(
              "Email already exists, please pick a different email"
            );
          }
        });
      }),
    body("password")
      .isLength({ min: 6, max: 10 })
      .withMessage("please use at least 6 characters"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match");
      }
      return true;
    })
  ],

  authCtrl.postSignup
);
router.post("/reset", authCtrl.postReset);
router.post("/new-password", authCtrl.postNewPassword);

module.exports = router;
