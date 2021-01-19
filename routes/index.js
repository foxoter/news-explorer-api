const routes = require('express').Router();
const authRoutes = require('./authRouter');
const userRoutes = require('./usersRouter');
const articleRoutes = require('./articlesRouter');
const NotFoundError = require('../errors/notFountError');

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(articleRoutes);
routes.use('/', () => {
  throw new NotFoundError('Resource is not found');
});

module.exports = routes;
