const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  HomeAddress: {
    type: String,
    required: true
  },
  CountryCode: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  TelephoneNumber: {
    type: Array,
    required: true
  },
  PassportNumber: {
    type: String,
    required: true
    
  },

  admin: {
    type: Boolean
    
  }

  


});

module.exports = User = mongoose.model('user', UserSchema);