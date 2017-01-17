const _ = require('lodash'),
      mongodb = require('mongodb'),
       JSON = require('circular-json');
       
      var movies = moviesDB();
const borrowedCountDict = {},
      categories = require('./../data/categories.json');

module.exports = {
    getAllMovies: function() {
        return mapMovies(movies);
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
