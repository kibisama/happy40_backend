const express = require("express");
const router = express.Router();

const {
  email_validity_checks,
  join,
  login,
  auth,
} = require("../controllers/auth");

router.post("/email_validity_checks", email_validity_checks);
router.post("/join", join);
router.post("/login", login);

//
router.post("/test", auth, (req, res, next) => {
  console.log(req.isAuthenticated(), "isAuth");
  return res.send(req.user);
});

module.exports = router;
