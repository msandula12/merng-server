const jwt = require('jsonwebtoken');

const { AuthenticationError } = require('apollo-server');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const [_, token] = authHeader.split('Bearer ');
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error('Authorization header must be provided');
};
