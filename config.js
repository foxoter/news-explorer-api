const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;
module.exports.MONGO_URL = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/newsexplorerdb';
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';
module.exports.PORT = process.env.PORT || 3000;
module.exports.mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
