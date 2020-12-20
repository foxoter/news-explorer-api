const mongoose = require('mongoose');
const validator = require('validator');

const urlValidator = validator.isURL;

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (link) => urlValidator(link),
      message: 'URL validation failed',
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (link) => urlValidator(link),
      message: 'URL validation failed',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
