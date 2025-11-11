const User = require("../models");

/**
 * @param {string} email
 * @returns {Proimse<boolean>}
 */
exports.email_validity_checks = async (email) => {
  try {
    if (await User.findOne({ where: { email } })) {
      return false;
    }
    return true;
  } catch (e) {
    throw e;
  }
};
