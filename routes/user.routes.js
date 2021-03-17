const { userNew, userCreate } = require('../controllers/user.controller');
const router = require('express').Router();
const { ensureAuthenticated } = require('../config/security.config')

router.get('/new', userNew);
router.post('/', userCreate)
router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('user/protected');
})
module.exports = router;