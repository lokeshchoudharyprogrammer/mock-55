const jwt = require("jsonwebtoken")
const authenticateToken = (req, res, next) => {
    const { token } = req.body;
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, "shhhhh", (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};


module.exports = { authenticateToken };