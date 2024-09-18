const users = require("../model/user");
const assignSessions = require("../utils/assignSessions");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cryptoModel = require("../model/crypto");
const sendMail = require("../utils/nodeMailer");

exports.getRegister = (req, res, next) => {
  res.render("register/register.ejs", {
    pageTitle: "Registration",
    path: "/register",
  });
};

exports.postRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  // if (password !== confirmPassword) {
  //   console.log("password not match");
  //   return res.redirect("/register");
  // }

  users
    .findOne({ email })
    .then((user) => {
      if (user && user.length !== 0) {
        return res.redirect("/login");
      }
      const token = crypto.randomBytes(32).toString("hex");
      const bcryptPassword = bcrypt.hashSync(password, 12);
      const saveCryptotoken = new cryptoModel({
        token,
        name,
        email,
        password: bcryptPassword,
      });
      return saveCryptotoken
        .save()
        .then(() => {
          sendMail(email, token);
          res.redirect("/")
        })
        .catch((err) => {
          const error = new Error(err);
          error.statusCode = 500;
          return next(error);
        });
    }) 
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

exports.getVerify = (req, res, next) => {
  const token = req.params.token;
  cryptoModel
    .findOne({ token })
    .then((cryptoUser) => {
      if (!cryptoUser) {
        return res.redirect("/");
      }
      const { name, email, password } = cryptoUser;
      const saveUser = new users({ name, email, password });
      return saveUser
        .save()
        .then((user) => {
          return assignSessions(user, (token) => {
            res.cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            });
            return res.redirect("/");
          });
        })
        .catch((err) => {
          const error = new Error(err);
          error.statusCode = 500;
          return next(error);
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

exports.getLogin = (req, res, next) => {
  res.render("register/login.ejs", {
    pageTitle: "Login",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  users
    .findOne({ email })
    .then((user) => {
      if (!user) {
        res.redirect("/login");
      }
      const match = bcrypt.compare(password, user.password);
      if (match) {
        return assignSessions(user, (token) => {
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          return res.redirect("/");
        });
      } else {
        return res.redirect("/login");
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500
      return next(error)
    });
};
