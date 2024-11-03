const jwt = require('jsonwebtoken');
const jwt_SECRET = 'Hritikbhau';

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate with a valid token' });
    }
    
    try {
        const data = jwt.verify(token, jwt_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate with a valid token' });
    }
};

module.exports = fetchuser;
