const passport = require("passport");
const auth = require("../services/auth");

exports.email_validity_checks = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (await auth.is_email_valid(email)) {
      return res.sendStatus(200);
    }
    return res.sendStatus(422);
  } catch (e) {
    next(e);
  }
};

exports.join = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const status = await auth.join(email, password);
    res.sendStatus(status);
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await auth.login(email, password);
    if (typeof result === "number") {
      return res.sendStatus(result);
    } else {
      return res.send(result);
    }
  } catch (e) {
    next(e);
  }
};

exports.auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (authError, auth, info) => {
    if (authError) {
      //
      return next(authError);
    }
    if (!auth) {
      //
    }
    // return req.login(user, (loginError) => {
    //   if (loginError) {
    //     //
    //     return next(loginError);
    //   }
    //   return res.sendStatus(200);
    // });
    next();
  })(req, res, next);
};
