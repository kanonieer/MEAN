var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  name: String,
  password: String,
  admin: Boolean
});

var User = mongoose.model('User', user);

module.exports = User;