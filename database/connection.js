const mongoose = require("mongoose");
require("dotenv").config();

const databaseUrl = `mongodb+srv://${process.env.TRAILS_DB_USERNAME}:${process.env.TRAILS_DB_PASSWORD}@${process.env.TRAILS_DB_URI}`;
const dbOptions = {
  useNewUrlParser: true,
  dbName: "trailsdb",
  useUnifiedTopology: true,
};

mongoose.connect(databaseUrl, dbOptions).catch((err) => console.log(err));

const db = mongoose.connection;

db.on("connected", () => console.log("connected to Mongo"));

db.once("open", function () {
  db.collection("collection", function (err, collection) {
    collection.find({}).toArray(function (err, data) {});
  });
});
