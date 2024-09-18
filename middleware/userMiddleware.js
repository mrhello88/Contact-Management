const jwt = require("jsonwebtoken");
const sessions = require("../model/sessions");
const user = require("../model/user");
exports.User = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  sessions
    .findOne({ token })
    .then((session) => {
      if (!session) {
        return next();
      }

      jwt.verify( 
        session.token,
        process.env.S_SECTRETKEY,
        (err, decoded) => {
          if (err) {
            return next();
          }
          user
            .findById({ _id: decoded.userId })
            .then((user) => {
              if (!user) {
                return next(); // If user not found, proceed
              }
              req.isLoggedIn = decoded.isLoggedIn;
              req.user = user;
              return next();
            })
            .catch((err) => {
              return next();
            });
        }
      );
    })
    .catch((err) => {
      return next();
    });
};
