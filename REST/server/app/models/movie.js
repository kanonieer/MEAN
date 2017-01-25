var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config      = require('./../../config');
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(config.database); 
autoIncrement.initialize(connection);

var movie = new Schema({
  id: {type: Number, required: true},
  name: String,
  categoryIds: Array,
  count: Number,
  fee: Number
});

movie.plugin(autoIncrement.plugin, {
    model: 'Movie',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

var Movie = mongoose.model('Movie', movie);

module.exports = Movie;