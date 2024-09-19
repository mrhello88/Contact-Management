require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const checker = require("./router/checker");
const errors = require("./controller/error");
const account = require("./router/account");
const User = require("./middleware/userMiddleware").User;

//csrf for cross-site-request-forgery and cookie-parser for check the cookies send or not, and make the sequence like this here//////
const csrfProtection = csurf({ cookie: true });
app.use(cookieParser()); //we need for two reasons(1:for token from req.cookies.token, that we asign when login,res.cookie("token",token) like this),
//(reason:2 for csrf, we need this because "cookie" is true in csrfProtection)
//         /////////////////////////////////////
//to here //////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "view");

app.use(User); //we here is the session check for user, to remain login or not
app.use(csrfProtection); // after the sessions and cookies like authentication
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(checker);
app.use(account);

app.use(errors.error404);

app.use((error, req, res, next) => { 
  const statusCode = error.statusCode;
  if (statusCode === 500) {
    res.status(500).render("error/error500", {
      pageTitle: "Server Error",
      errorMessage: "Something went wrong!",
    });
  } else if (statusCode === 400) {
    res.status(400).render("error/error400", {
      pageTitle: "Server Error",
      errorMessage: error.message || "Something went wrong!",
    });
  }
});

console.log("pakistan");

mongoose.connect(process.env.DB_STRING).then(() => {
  app.listen(port);
});
