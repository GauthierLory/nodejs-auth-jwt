const { createUser } = require('../queries/user.queries');

exports.userNew = (req, res, next) => {
    res.render('auth/signup');
}

exports.userCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await createUser(body);
        req.login(user, (err) => {
            if (err){ next(e) }
            res.redirect('/');
        })
    } catch(e) {
        res.render('auth/signup', { error: e.message });
        // const errors = Object.keys(e.errors).map( key => e.errors[key].message );
        // res.status(400).render('signup', { errors });
    }
}