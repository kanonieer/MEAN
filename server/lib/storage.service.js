const _ = require('lodash'),
      mongodb = require('mongodb'),
      JSON = require('circular-json'),
      assert = require('assert');
       
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/database';
var movies = [];
var ObjectId = require('mongodb').ObjectID;

refresh();

const borrowedCountDict = {},
      categories = require('./../data/categories.json');

module.exports = {
    getAllMovies: function() {
        return mapMovies(movies);
    },
    addMovie: function (req,res){
        MongoClient.connect(url, function(err, db){
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } else {
            console.log('Connected to Server');
    
            var collection = db.collection('movies');
            var movie = {name: req.body.name, categoryIds: req.body.categoryIds,
            count: req.body.count, fee: req.body.fee};
    
            collection.insert([movie], function (err, result){
            if (err) {
                console.log(err);
            } else {
                console.log('Successful adding')
                res.json(movie);
            }
            db.close();
            });
        }
        });
      refresh();
    },
    getMovieById: function (req,res){
        MongoClient.connect(url, function(err, db){
            if (err) {
                console.log('Unable to connect to the Server:', err);
            } else {
                console.log('Connected to Server');
    
                var collection = db.collection('movies');
                var tmp_id = req.params._id;
                var id = new ObjectId(tmp_id);           
                collection.findOne({ _id: id}, function (err, result){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Success');
                        res.json(result);
                    }                      
                    db.close();
                });
            }
        });      
    },
    removeMovie: function (req,res){
        MongoClient.connect(url, function(err, db){
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } else {
            console.log('Connected to Server');

            var collection = db.collection('movies');
            var tmp_id = req.params._id;
            var id = new ObjectId(tmp_id);
            collection.remove({ _id: id}, function (err, result){
            if (err) {
                console.log(err);
            } else {
                console.log('Success deleting')
                res.json(result);
            }
            db.close();
            });
        }
        });
        refresh();
    },
    getCategoriesDictionary: function() {
        return categories;
    },
    getMoviesFrom: function(categoryId) {
        const applicable =  _.filter(movies, movie => _.includes(movie.categoryIds, categoryId));
        return mapMovies(applicable);
    },
    borrow: function(movieIds) {
        return _.every(movieIds, movieId => {
            if (!movies[movieId] || movies[movieId].count === borrowedCountDict[movieId]) {
                return false;
            }
            borrowedCountDict[movieId] = (borrowedCountDict[movieId] || 0) + 1;
            return true;
        });
    }
};

function refresh(){
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    console.log('Connection established to', url);
    var collection = db.collection('movies');
 
    collection.find({}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        movies = result;
      } else {
        console.log('No documents found');
      }
      db.close();
    });
  }
  }); 
}







////////////STARE FUNKCJE ////////////////////
function moviesDB(){
    var MongoClient=mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/database';
    MongoClient.connect(url, function(err,db){
            var collection = db.collection('movies');
            collection.find({}).toArray(function(err,result){
                console.log("movies ="+ JSON.stringify(result));
                movies = parseMovieList(result);
                db.close();
            });
    });
}

function parseMovieList(rawMovies) {
    console.log(rawMovies);
    return _.reduce(rawMovies, (result, movie, key) => {
        result[key+1] = _.assign({}, movie, { id: key + 1 });
        return result;
    }, {});
}

function mapMovies(movies) {
    return _.map(movies, movie => {
        var borrowedCount = borrowedCountDict[movie.id] || 0;

        return  {
            _id: movie._id,
            id: movie.id,
            name: movie.name,
            categoryIds: movie.categoryIds,
            fee: movie.fee,
            isAvailable: movie.count > borrowedCount,
            copiesLeft: movie.count - borrowedCount
        };
    });
}
