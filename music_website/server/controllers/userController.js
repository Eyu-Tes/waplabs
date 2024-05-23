const User = require('../models/user');

const login = (req, res) => {
    const { username, password } = req.body;
    const user = User.findUser(username, password);
    if (user) {
        const token = `${username}_${new Date(new Date().getTime() + 3600000).toISOString()}`; // Token valid for 1 hour
        res.send({ token });
    } else {
        res.status(401).send('Error');
    }
};

module.exports = { login };
