const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getSingleUser } = require('../controllers/usersController');

router.get('/users/me', auth, getSingleUser);

module.exports = router;
