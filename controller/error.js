exports.error404 = (req, res, next) => {
  res.status(404).render("error/error404", {
    pageTitle: "Page Not Found",
    errorMessage: "The page you are looking for does not exist.",
  });
};
