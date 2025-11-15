const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set("port", process.env.PORT || 8001);

app.use(morgan("combined"));

if (process.env.NODE_ENV === "production") {
  const helmet = require("helmet");
  const hpp = require("hpp");

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
}

const { sequelize } = require("./models");
sequelize
  .sync()
  .then(() => console.log("DB 연결 성공"))
  .catch((e) => console.error(e));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const passport = require("passport");
require("./passport")();
app.use(passport.initialize());

const router = require("./routes");
app.use("/", router);

const logger = require("./logger");
app.use((e, req, res, next) => {
  console.error(e);
  logger.log({
    level: "error",
    message: e.message,
    stack: e.stack,
    timestamp: new Date().toString(),
    req_ip: req.ip,
  });
  res.sendStatus(e.status || 500);
});

app.listen(app.get("port"), () =>
  console.log(app.get("port"), "번 포트에서 대기 중")
);
