exports.sessionNew = (req, res, next) => {
    res.render('auth/signin', { error: null })
}

exports.sessionCreate = (req, res, next) => {
    res.end();
}

exports.sessionDelete = (req, res, next) => {
    req.logout();
    res.redirect('/');
}