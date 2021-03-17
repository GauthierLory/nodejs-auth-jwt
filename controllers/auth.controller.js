const {findUserPerEmail} = require("../queries/user.queries");
exports.signinForm = (req, res, next) => {
    res.render('auth/signin', { error: null })
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserPerEmail(email);
        if (user) {
            const match = await user.comparePassword(password);
            if (match){
                req.login(user);
                res.redirect('/users/profile');
            }else{
                res.render('auth/signin', { error: 'Wrong credentials' })
            }
        }else{
            res.render('auth/signin', { error: 'User not found' })
        }
    }catch (e){
        next(e);
    }

    res.end();
}

exports.signout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}