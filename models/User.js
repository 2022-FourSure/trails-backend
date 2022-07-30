const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: String,
  name: { type: String, default: "" },
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  access_token: String,
  refindexsh_token: String,
});

//index allows for fast lookups of a field and ensures no duplicates
//an index event for user schema created. MongoDb let us know when the index for userSchema is complete.
UserSchema.on("index", (error) => {
  if (error) {
   console.log("indexing user error occurred", error.message);
  }
  console.log('Finished indexing on User')
});

const User = mongoose.model("User", UserSchema);

const emailIndexPresent = (indexes) => {
  return indexes.some((index) => {
    return index.includes('email');
  })
}

const ensureIndexes = () => {
  User.ensureIndexes(function (error) {
    if (error) {
      console.log("Error while running ensureIndexes", error);
    }
  })
}

const getAndCreateIndexes = () => {
  User.collection.getIndexes().then((indexes) => {
    let userIndexNames = Object.keys(indexes);
    if (!emailIndexPresent(userIndexNames)) {
      return ensureIndexes();
    }
  })
}

getAndCreateIndexes();

module.exports = User;
