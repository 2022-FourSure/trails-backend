const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  refresh_token: String,
});

UserSchema.on("index", (error) => {
  console.log("indexing user error occurred", error.message);
});

const User = mongoose.model("User", UserSchema);

User.ensureIndexes(function (err) {
  if (err) {
    console.log("error while running ensureIndexes", err);
  } else {
    console.log("successfully ran ensureIndexes");
  }
});

module.exports = User;
