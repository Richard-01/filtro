const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; 
    if (!token) {
        return res.status(401).send({ status: false, message: 'Token no proporcionado y por eso no has iniciado sesión.' });
            
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Token inválido.' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;