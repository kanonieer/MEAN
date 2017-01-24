const _ = require('lodash'),
      mongodb = require('mongodb'),
      JSON = require('circular-json'),
      assert = require('assert'),
      revalidator = require('revalidator');
       
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
            movie = {name: req.body.name, categoryIds: req.body.categoryIds,
            count: req.body.count, fee: req.body.fee};
            console.log(isNumeric(req.body.fee));
                        var error = (revalidator.validate(movie, {
                            properties: {
                            name: {
                                description: 'Name of movie',
                                type: 'string',
                                required: true
                            },
                            categoryIds: {
                                description: 'Name of categorys for movie',
                                type: 'any'
                            },
                            count: {
                                description: 'The number of copies of the film',
                                type: 'number',
                                required: true
                            },
                            fee: {
                                description: 'The cost of rent one copy',
                                type: 'number',
                                required: true
                            }
                            }
                        }));
            if( error.valid==false )
            {   
                res.status(400).json({code: 400, message: "Bad Request", field: error.errors[0].property, details: error.errors[0].message});
                db.close();
            }
            else{
                        collection.insert([movie], function (err, result){
                        if (err) {
                            console.log(err);
                        } 
                        else {
                            console.log('Successful adding');
                            res.status(201);                    ///status 201 'created'
                            res.json(movie);
                        }
                        db.close();
                        });
            }
        }
        });
        movies=[];
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
                console.log(tmp_id.length);
                if(tmp_id.length!=24)
                {
                    console.log("blad getMovieById nie ma takiego id");
                    res.status(400).json({code: 400, message: "Bad Request", details: "ID argument is incorect"});
                    db.close();
                }
                else
                {
                        var id = new ObjectId(tmp_id)
                        collection.findOne({ _id: id}, function (err, result){
                            if (err) {
                                console.log(err);
                            } else {
                                if(result==null)
                                {
                                    res.status(404).json({code: 404, message: "Not Found", details: "There is no Movie with this ID"});///// wyslanie statusu 400 'bad request' tzn nie ma movie o takim ID
                                }
                                else
                                {
                                    console.log('Success');
                                    res.json(result);
                                }
                            }                      
                            db.close();
                        });
                }
            }
        });
        movies=[];
        refresh();      
    },
    removeMovie: function (req,res){
        MongoClient.connect(url, function(err, db){
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } else {
            console.log('Connected to Server');
            var collection = db.collection('movies');
            var tmp_id = req.params._id;
            if(tmp_id.length!=24)
                {
                    res.status(400).json({code: 400, message: "Bad Request", details: "ID argument is incorect"}); //// 204 'no content' tzn nie ma movie o takim ID
                    db.close();
                }
                else
                {
                        var id = new ObjectId(tmp_id);
                        collection.findOneAndDelete({ _id: id}, function (err, result){
                        if (err) {
                            console.log(err);
                        } else {
                            if(result.value==null)
                            {
                                res.status(404).json({code: 404, message: "Not Found", details: "There is no Movie with this ID"});///// wyslanie statusu 400 'bad request' tzn nie ma movie o takim ID
                            }
                            else
                            {
                                console.log('Success deleting');
                                res.status(204).json("udalo sie");
                            }         

                        }
                        db.close();
                        });
                }
        }
        });
        movies=[];
        refresh();
    },
    updateMovie: function(req, res){
        MongoClient.connect(url, function(err, db){
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } else {
            console.log('Connected to Server');

            var collection = db.collection('movies');
            var tmp_id = req.params._id;
            var id = new ObjectId(tmp_id);
            var update = { name : req.body.name, categoryIds : req.body.categoryIds, count: req.body.count, fee: req.body.fee  };
            collection.findOneAndUpdate({_id : id}, update, function(err,result){
                console.log(result);
                if(result.value==null)
                {
                    res.status(400).json({code: 400, message: "Bad Request", details: "Nie ma filmu o takim ID"});///// wyslanie statusu 400 'bad request' tzn nie ma movie o takim ID
                }     
                res.json(update); /// zwrocil udany update
                res.status(201) /// '201' Created udany zapis do bazy
            });

            db.close();
        }
        });
        movies=[];
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


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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
