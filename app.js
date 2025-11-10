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
if (process.env.NODE_ENV === "production") {
} else {
  app.use(morgan("dev"));
}

const { sequelize } = require("./models");
sequelize
  .sync()
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const router = require("./routes");
app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(err.status || 500);
});

app.listen(app.get("port"), () =>
  console.log(app.get("port"), "번 포트에서 대기 중")
);
