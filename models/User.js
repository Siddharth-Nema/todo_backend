const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  fcmToken: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;