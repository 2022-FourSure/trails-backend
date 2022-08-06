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
const reviewRoutes = require('./routes/reviewRoutes');

// Connect to the database
require('./database/connection');

// Heroku needs this OR statement, it creates its own PORT
const PORT = process.env.PORT || 8080

// Middleware starts here
app.use(morgan('tiny'));
app.use(timeout("5s"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cors allows us to pass info between backend and frontend
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(haltOnTimedout);
app.use(cookieParser());
// Middleware ends here

// Routes start here
app.get('/', (req, res) => {
  res.redirect('/trails')
});
app.use('/trails', trailRoutes)
app.use('/', authenticationRoutes)
app.use('/trails', reviewRoutes)

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}}`);
});
