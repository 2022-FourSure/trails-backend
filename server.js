const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const timeout = require("connect-timeout");
const cookieParser = require("cookie-parser");
require("./database/connection");
const routes = require("./routes");
const { haltOnTimedout } = require("./helpers");

app.use(timeout("5s"));
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(haltOnTimedout);
app.use(cookieParser());
app.use(timeout("5s"));

app.use("/", routes);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
