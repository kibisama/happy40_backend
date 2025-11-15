const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * @param {string} email
 * @returns {Proimse<boolean>}
 */
exports.is_email_valid = async (email) => {
  try {
    if (await User.findOne({ where: { email } })) {
      return false;
    }
    return true;
  } catch (e) {
    throw e;
  }
};

/**
 * @param {string} email
 * @param {string} password
 * @returns {Proimse<>}
 */
exports.join = async (email, password) => {
  try {
    if (!(await exports.is_email_valid(email))) {
      return 422;
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hash,
    });
    // return token
    return 200;
  } catch (e) {
    throw e;
  }
};

/**
 * @param {string} email
 * @param {string} password
 * @returns {Proimse<>}
 */
exports.login = async (email, password) => {
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return jwt.sign(
          {
            sub: user.email,
          },
          process.env.JWT_SECRET
        );
      } else {
        return 401;
      }
    } else {
      return 404;
    }
  } catch (e) {
    throw e;
  }
};
