const mongoose = require("mongoose");

// Create new User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  refresh_token: String,
});

// CC: THIS CODE NEEDS COMMENTS
UserSchema.on("index", (error) => {
  console.log("indexing user error occurred", error.message);
});

const User = mongoose.model("User", UserSchema);

// CC: THIS CODE NEEDS COMMENTS
User.ensureIndexes(function (err) {
  if (err) {
    console.log("Error while running ensureIndexes", err);
  } else {
    console.log("Successfully ran ensureIndexes");
  }
});

module.exports = User;
