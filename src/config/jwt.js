const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}


const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token: ' + error.message);
    }
}

const authToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' });
        }
        
        const token = authHeader.split(' ')[1];
        if (!JWT_SECRET) {
            return res.status(500).json({ message: 'Error de configuración del servidor' });
        }
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            next();
        } catch (tokenError) {
            return res.status(401).json({ message: 'Token inválido: ' + tokenError.message });
        }
    } catch (error) {
        console.error('Error general:', error);
        return res.status(500).json({ message: 'Error en autenticación: ' + error.message });
    }
}

module.exports =  {
    generateToken,
    verifyToken, 
    authToken
}