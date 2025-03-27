const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

module.exports =  {
    generateToken
}