const Article = require('../models/article');
const NotFoundError = require('../errors/notFountError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate('owner')
    .then((articles) => {
      if (!articles.length) {
        throw new NotFoundError('There are no articles yet...');
      }
      res.send({ articles });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send({ article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(`${err.message}`);
      }
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const articleId = req.params.id;
  Article.findById(articleId)
    .populate('owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('No article is matching that id...');
      }
      if (article.owner.id !== req.user._id) {
        throw new ForbiddenError('You have no rights to delete this article');
      }
      Article.deleteOne(article).then(() => res.send({ article }));
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
