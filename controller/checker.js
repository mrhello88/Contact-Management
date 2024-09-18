const checker = require("../model/checker");

exports.getHome = (req, res, next) => {
  res.render("home",{
    pageTitle: "Home",
    path: "/",
  });
};


exports.getChecker = (req, res, next) => {
  res.render("checker",{
    pageTitle: "Add Your Number",
    path: "/add",
  });
};

exports.postChecker = (req, res, next) => {
  const { name, mobile, shopName, province, district } = req.body;
  const user = req.user

  checker
    .findOne({userId:user, mobile: mobile, district:district })
    .then((doc) => {
      if (doc && doc.length !== 0) { 
        return res.redirect("/");
      }
      
      const saveChecker = new checker({
        userId:user._id,
        name, 
        mobile,
        shopName,
        province,
        district,
      });

      saveChecker.save().then((result) => {
        res.redirect("/");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500
      return next(error)
      
    });
};
