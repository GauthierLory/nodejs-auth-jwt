const secret = '02c1b350-30b3-4256-adde-af7471439d42';
const jwt = require('jsonwebtoken')
const { findUserPerId } = require('../queries/user.queries')
const { app } = require('../app')

const createJwtToken = (user) => {
    const jwtToken = jwt.sign({
        sub: user._id.toString(),
        exp: Math.floor(Date.now() / 1000) + 60 + 60 * 24
    }, secret);
    return jwtToken;
}

exports.createJwtToken = createJwtToken;

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

const addJwtFeatures = (req, res, next) => {
    req.isAuthenticated = () => !!req.user;
    req.logout = () => res.clearCookie('jwt')
    req.login = (user) => {
        const token = createJwtToken(user)
        res.cookie('jwt', token);
    }
    next();
}

app.use(extractUserFromToken);
app.use(addJwtFeatures);