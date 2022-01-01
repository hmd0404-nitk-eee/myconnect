const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { DECRYPT_KEY } = require('../config');

module.exports = (context) => {
    const authHeaders = context.req.headers.authorization;

    if(authHeaders) {
        const token = authHeaders.split('Bearer ')[1];

        if(token) {
            try {
                const user = jwt.verify(token, DECRYPT_KEY);
                return user;
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired Token!');
            }
        } else {
            throw new AuthenticationError('Could not find Authentication Token!');
        }
    } else {
        throw new AuthenticationError('Could not find Authorization Headers in the request!');
    }
}