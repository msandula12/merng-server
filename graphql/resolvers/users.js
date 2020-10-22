const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config');

const User = require('../../models/User');

module.exports = {
  Mutation: {
    async register(
      _parent,
      { registerInput: { confirmPassword, email, password, username } }
    ) {
      // TODO: Validate user data

      // Make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is already taken',
          },
        });
      }

      // Hash password and create auth token
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
