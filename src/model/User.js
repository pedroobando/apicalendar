const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model('User', UserSchema);
