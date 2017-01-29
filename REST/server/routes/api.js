var express     = require('express');
var router      = express.Router();

var jwt         = require('jsonwebtoken');
var config      = require('./../config');

var mongoose    = require('mongoose');

var User        = require('./../app/models/user'); // users
var Movie       = require('./../app/models/movie'); // movie

app = express();
app.set('superSecret', config.secret); // secret variable

var connection = mongoose.connect(config.database); 

router.get('/deleteMovies', function(req, res) {
  Movie.remove({},function(err) {
    if (err) throw err;

    console.log('Movies deleted successfully');
    res.json({ success: true });
  });
});

router.get('/setupMovies', function(req, res) {

  var movie1 = new Movie({ 
    name: 'Dark Tower',
    categoryIds: ["adventure", "fantasy"],
    count: 1,
    fee: 8.99
  });
  var movie2 = new Movie({ 
    name: "Twilight",
    categoryIds: ["fantasy", "comedy"],
    count: 3,
    fee: 5.99
  });
  var movie3 = new Movie({ 
    name: "Star Trek",
    categoryIds: ["sciFi", "adventure"],
    count: 3,
    fee: 5.99
  });

  movie3.save(function(err) {
    if (err) throw err;

    console.log('Movie saved successfully');
    res.json({ success: true });
  });
});

//wymagany token
/*router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});
*/

//////////////////////
////// MOVIES ////////
//////////////////////

// all movies (GET http://localhost:8080/api/movies)
router.get('/movies', function(req, res) {
  Movie.find({}, function(err, movies) {
    res.json(movies);
  });
}); 

// movie by Id (GET http://localhost:8080/api/movies/:id)
router.get('/movies/:id', function(req, res) {
  Movie.find({ id: req.params.id}, function(err, movie) {
    if (err) throw err;

    res.json(movie);
  });
}); 

// create movie (POST http://localhost:8080/api/movies)
router.post('/movies', function(req, res) {
  var movie = new Movie({ 
    name: req.body.name,
    categoryIds: req.body.categoryIds,
    count: req.body.count,
    fee: req.body.fee
  });

  movie.save(function(err) {
    if (err) throw err;

    console.log('Movie saved successfully');
    res.json({ success: true });
  });
}); 

// delete movie (DELETE http://localhost:8080/api/movies/:id)
router.delete('/movies/:id', function(req, res) {
  Movie.findOneAndRemove({ id: req.params.id }, function(err, movie) {
    if (err) throw err;
    
    if(movie == null){
      console.log('No movie found');
      res.json({ message: 'No movie found' });
    }else{
      console.log('Movie deleted successfully');
      res.json({ success: true });
    }
  });
}); 

// update movie (PUT http://localhost:8080/api/movies/:id)
router.put('/movies/:id', function(req, res) {
  Movie.findOne({ id: req.params.id }, function(err, movie) {
    if (err) throw err;

    if (req.body.name){
      movie.name = req.body.name;
    }
    if (req.body.categoryIds){
      movie.categoryIds = req.body.categoryIds;
    }
    if (req.body.count){
      movie.count = req.body.count;
    }
    if (req.body.fee){
      movie.fee = req.body.fee;
    }
    movie.save(function(err) {
      if (err) throw err;

      console.log('Movie successfully updated!');
      res.json(movie);
    });
  });
}); 

//////////////////////
/////// USERS ////////
//////////////////////

// all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// create movie (POST http://localhost:8080/api/users)
router.post('/users', function(req, res) {
  var user = new User({ 
    name: req.body.name,
    password: req.body.password,
    movies: [],
    admin: false
  });

  user.save(function(err) {
    if (err) throw err;

    console.log('User created successfully');
    res.json({ success: true });
  });
}); 

//////////////////////
/// MOVIE COMMANDS ///
//////////////////////

// borrow a movie (POST http://localhost:8080/api/movies-commands/:id)
router.post('/movies-commands/:id', function(req, res){

});

// return movie (PUT http://localhost:8080/api/movies-commands/:id)
router.put('/movies-commands/:id', function(req, res){
  
});

// authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 24*60*60// expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

module.exports = router;  