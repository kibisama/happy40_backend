const express = require("express");
const router = express.Router();

const { email_validity_checks } = require("../controllers/auth");

router.use("/email_validity_checks", email_validity_checks);

module.exports = router;
