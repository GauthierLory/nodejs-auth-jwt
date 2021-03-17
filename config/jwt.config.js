const secret = '02c1b350-30b3-4256-adde-af7471439d42';
const jwt = require('jsonwebtoken')
const { findUserPerId } = require('../queries/user.queries')
const { app } = require('../app')

/**
 * Création d'un JWT
 * @param user - token pour le user
 * @returns {token}
 */
exports.createJwtToken = (user) => {
    const jwtToken = jwt.sign({ sub: user._id.toString()}, secret);
    return jwtToken;
}

const extractUserFromToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret);
            const user = await findUserPerId(decodedToken.sub);
            if (user) {
                req.user = user;
                next();
            }else {
                res.clearCookie('jwt');
                res.redirect('/');
            }
        }catch (e){
            res.clearCookie('jwt');
            res.redirect('/');
        }
    }else {
        next();
    }
}

app.use(extractUserFromToken);