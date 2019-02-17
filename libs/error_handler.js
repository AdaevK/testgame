// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message || err.name });
};
