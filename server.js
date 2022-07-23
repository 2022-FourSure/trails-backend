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
const trailRoutes = require('./routes/trailRoutes');

// Middleware starts here
// Cors allows us to pass info between backend and frontend
app.use(timeout("5s"));
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(haltOnTimedout);
app.use(cookieParser());
app.use(timeout("5s"));

app.use("/", routes);
app.use('/trails', trailRoutes);


app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
