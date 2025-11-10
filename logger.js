const { createLogger, format, transports } = require("winston");

module.exports = createLogger({
  level: "error",
  format: format.printf(
    ({ message, timestamp, stack }) =>
      `{
  timestamp: ${timestamp},
  message: ${stack || message}
}`
  ),
  transports: [new transports.File({ filename: "error.log", level: "error" })],
});
