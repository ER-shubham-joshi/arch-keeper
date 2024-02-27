const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    // Check if the request is a GraphQL request
    if (req.body && req.body.query) {
        const query = req.body.query;
        const queriesToExclude = ['createUser', 'login']
        // Check if the query contains the signup mutation
        if (queriesToExclude.some(name => query.includes(name))) {
            // Skip authentication for signup mutation
            next();
            return;
        }
    }
    const token = req.headers.authorization || '';

    if (!token || !token.startsWith('Bearer ')) {
        res.status(401).send('Invalid or missing Bearer token');
        return;
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        // Check if the user has the required scope
        if (req.user.scope) {
            next();
        } else {
            res.status(403).send('Insufficient permissions');
        }
    } catch (error) {
        res.status(401).send('Invalid authentication token');
    }
};

module.exports = { authenticateUser };