const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config');
const {
  validateLoginInput,
  validateRegisterInput,
} = require('../../util/validators');

const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      // Validate input
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // Handle if user is not found
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      // Handle incorrect password
      const match = await bcyrpt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      // Handle successful login
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }

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

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
