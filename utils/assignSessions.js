const jwt = require("jsonwebtoken");
const session = require("../model/sessions");
// require('dotenv').config();

const assignSessions = (user, cb) => {
  const { name, email } = user;
  const token = jwt.sign(
    { name, email, userId: user._id, isLoggedIn: true },
    process.env.S_SECTRETKEY,
    {
      expiresIn: 259200,
    }
  );
  const saveSession = new session({ userId: user, token});
  saveSession
    .save()
    .then(() => {
      return cb(token);
    })
    .catch((err) => console.log(err)); 
};

module.exports = assignSessions; 
   