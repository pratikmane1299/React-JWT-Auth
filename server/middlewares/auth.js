const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const authorization = req.get('authorization');
  if (!authorization) {
    const error = new Error('UnAuthorized');
    error.status = 401;
    next(error);
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    const error = new Error('UnAuthorized');
    error.status = 401;
    next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) return next(error);
    req.user = payload;
    next();
  });
}