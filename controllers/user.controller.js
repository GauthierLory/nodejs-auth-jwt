const { createUser } = require('../queries/user.queries');

exports.userNew = (req, res, next) => {
    res.render('auth/signup');
}

exports.userCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await createUser(body);
        req.login(user);
        res.redirect('/users/profile');
    } catch(e) {
        res.render('auth/signup', { error: e.message });
    }
}