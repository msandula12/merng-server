const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');

const User = require('../../models/User');

module.exports = {
  Mutation: {
    async register(
      _parent,
      { registerInput: { confirmPassword, email, password, username } },
      _context,
      _info
    ) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: Hash password and create auth token
      password = await bcyrpt.hash(password, 12);
      const newUser = new User({
        createdAt: new Date().toISOString(),
        email,
        password,
        username,
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          email: res.email,
          id: res.id,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
