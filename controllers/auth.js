const user = require("../services/auth");

exports.email_validity_checks = async (req, res, next) => {
  try {
    const { email } = req.body;
    const check = await user.email_validity_checks(email);
    console.log(check);
    if (check) {
      return res.sendStatus(200);
    }
    return res.sendStatus(422);
  } catch (e) {
    next(e);
  }
};
