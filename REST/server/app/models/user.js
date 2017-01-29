var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config      = require('./../../config');
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(config.database); 
autoIncrement.initialize(connection);

var user = new Schema({
  id: {type: Number, required: true},
  name: String,
  password: String,
  movies: Array,
  admin: Boolean
});

user.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

var User = mongoose.model('User', user);

module.exports = User;