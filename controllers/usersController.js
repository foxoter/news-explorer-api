const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/notFountError');
const NotUniqueError = require('../errors/notUniqueError');
const BadRequestError = require('../errors/badRequestError');
const AuthError = require('../errors/authError');
const { JWT_SECRET } = require('../config');

const getSingleUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No users match this id');
      }
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!password) {
    res.status(400).send({ message: 'Invalid or empty password' });
    return;
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => res.send({ user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(`${err.message}`);
          }
          if (err.code === 11000) {
            throw new NotUniqueError('This email already exists');
          }
        })
        .catch(next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: 'Authorization success' });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        throw new AuthError(`${err.message}`);
      }
    })
    .catch(next);
};

const logout = (req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: 'Token deleted' });
};

module.exports = {
  getSingleUser,
  createUser,
  login,
  logout,
};
