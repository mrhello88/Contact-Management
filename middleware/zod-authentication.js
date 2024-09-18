exports.authentication = (schema) => (req, res, next) => {
  try {
    const body = req.body;
    const bodyParse = schema.parse(body);
    req.body = bodyParse;
    return next()
  } catch(err) {
    const error = new Error(err.errors[0].message);
    error.statusCode = 400;
    return next(error);
  };
};
