const user = require("../services/auth");

exports.email_validity_checks = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (await user.email_validity_checks(email)) {
      return res.sendStatus(200);
    }
    return res.sendStatus(422);
  } catch (e) {
    next(e);
  }
};
