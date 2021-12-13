const express = require("express");

const router = express.Router();

const User = require("../models/user");

const authController = require('../controllers/auth');

const { body } = require("express-validator/check");

router.put("/signup", [
  body("email")
    .isEmail()
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if(userDoc) {
              console.log('entered i');
            return Promise.reject("E-mail address already exists");
          }
        });
      })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().not().isEmpty(),
], authController.signup);

router.post('/login', authController.login);

module.exports = router;