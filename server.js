const express = require("express");
const app = express();
const path = require("path");
// Require cors to enable resource sharing between frontend and backend 
const cors = require("cors");
// Require morgan to log results
const morgan = require("morgan");

const bodyParser = require("body-parser");
const timeout = require("connect-timeout");
const cookieParser = require("cookie-parser");

// CC: THIS NEEDS A MORE DESCRIPTIVE NAME

const { haltOnTimedout } = require("./helpers");
const { authenticationRoutes, trailRoutes } = require('./routes'); 

// Connect to the database
require('./database/connection')

// CC: DO WE NEED A PORT VARIABLE IN .ENV?
// CC: IF NOT LET'S INSTANTIATE PORT IN THIS FILE AND EDIT THE APP.LISTEN

app.set("port", 8000);

// Middleware starts here
// Cors allows us to pass info between backend and frontend
app.use(timeout("5s"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

// CC: IT LOOKS LIKE BODYPARSER IS USED TWICE, HERE AND ABOVE. CAN WE DELETE ONE?
app.use(bodyParser.urlencoded({ extended: true }));

app.use(haltOnTimedout);
app.use(cookieParser());
app.use(timeout("5s"));
// Middleware ends here


// Routes start here
app.use('/trails', trailRoutes)
app.use('/', authenticationRoutes)
// FIRST ROUTES NEEDS MORE DESCRIPTIVE NAME

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
