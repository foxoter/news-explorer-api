const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const validator = require('validator');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articlesController');
const auth = require('../middlewares/auth');

router.get('/articles', auth, getArticles);
router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error('any.invalid'))),
    image: Joi.string().required()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error('any.invalid'))),
  }),
}), auth, createArticle);
router.delete('/articles/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), auth, deleteArticle);

module.exports = router;
