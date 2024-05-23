const User = require('../models/user');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    const [username, expirationDate] = token.split('_');
    if (new Date(expirationDate) > new Date()) {
        req.user = username;
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = { authenticate };
