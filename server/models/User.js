const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    unique: true,
  },

  Password: {
    type: String,
    required: true,
    unique: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  HomeAddress: {
    type: String,
    required: true,
  },
  CountryCode: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },

  TelephoneNumber: {
    type: String,
    required: true,
  },

  PassportNumber: {
    type: String,
    required: true,
  },

  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
