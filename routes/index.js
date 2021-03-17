const router = require('express').Router();
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const { ensureAuthenticated } = require('../config/security.config')

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.get('/',  ensureAuthenticated, (req, res) => {
    res.render('index', { user: req.user });
  });

module.exports = router;