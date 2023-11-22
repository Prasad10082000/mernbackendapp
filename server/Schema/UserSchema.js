const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
