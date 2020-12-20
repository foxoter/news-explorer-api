const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError('Authorization is required');
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Authorization is required');
  }
  req.user = payload;
  return next();
};
