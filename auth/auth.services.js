require('dotenv').config();
const { getUserByEmail } = require('../api/users/users.services');
const compose = require('composable-middleware');
const jwt = require('jsonwebtoken');

function isAuth() {
    return compose().use(async function (req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        const payload = await verifyToken(token);
        if (!payload) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const user = await getUserByEmail(payload.email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid data' });
        }
        req.user = user;
        req.body.email = req.user.email;
        next();
    });
}

function hasRole(allowedRoles = ['user', 'admin']) {
    return compose()
        .use(isAuth())
        .use(async function (req, res, next) {
            const { role } = req.user;
            if (!allowedRoles.includes(role)) {
                return res.status(401).json({ message: 'User not auth' });
            }
            next();
            return null;
        });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}

function signToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

module.exports = {
    isAuth,
    hasRole,
    signToken,
    verifyToken,
};
