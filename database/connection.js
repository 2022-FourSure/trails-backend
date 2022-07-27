const mongoose = require("mongoose");
// Require dotenv library so can use variables in .env file
require("dotenv").config();

const mongoURI = 'mongodb://localhost:27017/trails'

mongoose.connect(mongoURI, {
  useNewUrlParser: true
})
// Instantiate a variable for the mongoose connection
const db = mongoose.connection

// Once the database is connected, console log the db host and port
db.on('connected', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})


// CC: CAT'S CODE TO BE COMMENTED BACK IN LATER
// const databaseUrl = `mongodb+srv://${process.env.TRAILS_DB_USERNAME}:${process.env.TRAILS_DB_PASSWORD}@${process.env.TRAILS_DB_URI}`;
// const dbOptions = {
//   useNewUrlParser: true,
//   dbName: "trailsdb",
//   useUnifiedTopology: true,
// };

// mongoose.connect(databaseUrl, dbOptions).catch((err) => console.log(err));

// const db = mongoose.connection;

// db.on("connected", () => console.log("connected to Mongo"));

// db.once("open", function () {
//   db.collection("collection", function (err, collection) {
//     collection.find({}).toArray(function (err, data) {});
//   });
// });
