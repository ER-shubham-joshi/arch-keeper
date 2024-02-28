const jwt = require('jsonwebtoken');

const extractTokenFromAuthorization = (authHeader) => {
    return authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';
};

const extractTokenFromCookie = (cookieHeader) => {
    return cookieHeader ? cookieHeader.split('authToken=')[1] : '';
};


const authenticateUser = (req, res, next) => {
    // Check if the request is a GraphQL request
    if (req.body && req.body.query) {
        const query = req.body.query;
        const queriesToExclude = ['createUser', 'login'];

        // Check if the query contains a mutation to exclude
        if (queriesToExclude.some(name => query.includes(name))) {
            // Skip authentication for excluded mutations
            next();
            return;
        }
    }

    const token = extractTokenFromAuthorization(req.get('Authorization')) || extractTokenFromCookie(req.get('cookie'));

    if (!token) {
        res.status(401).json({ error: 'Invalid or missing Bearer token' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Check if the user has the required scope
        if (req.user.scope) {
            next();
        } else {
            res.status(403).json({ error: 'Insufficient permissions' });
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Authentication token has expired' });
        } else {
            res.status(401).json({ error: 'Invalid authentication token' });
        }
    }
};

module.exports = { authenticateUser };
