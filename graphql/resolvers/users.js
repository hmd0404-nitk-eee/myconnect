const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { DECRYPT_KEY } = require('../../config');
const { validateRegisterCredentials, validateLoginCredentials } = require('../../util/input_valitdators');

function generateJWToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    DECRYPT_KEY,
    { expiresIn: "1h" }
  );
}



module.exports = {
  Mutation: {
    async registerUser(parent, registerCredentials) {
      var { username, password, confirmPassword, email } = registerCredentials.registerCredentials;

      const { errors, valid } = validateRegisterCredentials(username, email, password, confirmPassword);

      if(!valid) {
          throw new UserInputError("Invalid Input Errors!", { errors });
      }

      const existing_user = await User.findOne({ username });
      const existing_email = await User.findOne({ email });

      if (existing_user) {
        throw new UserInputError("This Username is already taken!", {
          errors: {
            username: "This Username is already taken!",
          },
        });
      }
      if (existing_email) {
        throw new UserInputError("This Emai Address is already taken", {
          errors: {
            email: "This Email Address is already taken",
          },
        });
      }

      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const response = await newUser.save();

      const token = generateJWToken(response);

      return {
        ...response._doc,
        id: response._id,
        token
      };
    },

    async loginUser(
        parent,
        { username, password }
    ) {
        const { errors, valid } = validateLoginCredentials(username, password);

        if(!valid) {
            throw new UserInputError('BAD INPUT ERRORS', { errors });
        }

        const user = await User.findOne({ username });

        if(!user) {
            errors.general = 'User does not exist!';
            throw new UserInputError('User does not exist!', { errors });
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            errors.general = 'Wrong Credentials!';
            throw new UserInputError('Wrong Credentials!');
        }

        const token = generateJWToken(user);

        return {
            ...user._doc,
            id: user._id,
            token
        };
    }
  },
};
