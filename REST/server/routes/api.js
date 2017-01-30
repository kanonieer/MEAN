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

/**
 * @api {post} /movies Create User
 * @apiName PostUsers
 * @apiGroup Users
 *
 * @apiParam {String} name User name.
 * @apiParam {String} password User's password.
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "User created successfully"
 *     }
 *
 * @apiError MissingParameters There are missing parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "Bad Request",
 *       "details": "There are missing parameters"
 *     }
 */
// create user (POST http://localhost:8080/api/users)
router.post('/users', function(req, res) {
  var user = new User({ 
    name: req.body.name,
    password: req.body.password,
    movies: [],
    admin: false
  });
  if( req.body.name===undefined |  req.body.password===undefined )
    {   
      res.status(400).json({code: 400, message: "Bad Request", details: "There are missing parameters"});
    }
  else
  {
    user.save(function(err) {
      if (err) throw err;

      console.log('User created successfully');
      res.status(201).json("User created successfully");
    });
  }
}); 

// authenticate a user (POST http://localhost:8080/api/authentication)
router.post('/authentication', function(req, res) {

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

//wymagany token
router.use(function(req, res, next) {

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


//////////////////////
////// MOVIES ////////
//////////////////////

/**
 * @api {get} /movies Request all Movies
 * @apiName GetMovies
 * @apiGroup Movies
 *
 *
 * @apiSuccess {Movie[]} movies  all movies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *          "name": "Dark Tower",
 *          "categoryIds": ["adventure", "fantasy"],
 *          "count": 1,
 *          "fee": 8.99
 *        },
 *        {
 *           "name": "Twilight",
 *           "categoryIds": ["fantasy", "comedy"],
 *           "count": 3,
 *           "fee": 5.99
 *        },
 *        {
 *          "name": "Star Trek",
 *          "categoryIds": ["sciFi", "adventure"],
 *          "count": 3,
 *          "fee": 5.99
 *        }
 *     ]
 *
 */
// all movies (GET http://localhost:8080/api/movies)
router.get('/movies', function(req, res) {
  Movie.find({}, function(err, movies) {
    res.json(movies);
  });
}); 

/**
 * @api {get} /movies/:id Request Movie information
 * @apiName GetMovie
 * @apiGroup Movies
 *
 * @apiParam {Number} id Movie unique ID.
 *
 * @apiSuccess {String} name Name of the Movie.
 * @apiSuccess {String[]} categoryIds  Category of the Movie.
 * @apiSuccess {Number} count  Count of the Movie.
 * @apiSuccess {Number} fee  Cost of the Movie.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "Star Trek",
 *       "categoryIds": ["sciFi", "adventure"],
 *       "count": 3,
 *        "fee": 5.99
 *     }
 *
 * @apiError MovieNotFound The id of the Movie was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found",
 *       "details": "There is no Movie with this ID"
 *     }
 */
// movie by Id (GET http://localhost:8080/api/movies/:id)
router.get('/movies/:id', function(req, res) {
  Movie.find({ id: req.params.id}, function(err, movie) {
    if (err) throw err;
    if(movie.length<1){res.status(404).json({code: 404, message: "Not Found", details: "There is no Movie with this ID"})}
    else{res.json(movie)};
  });
}); 

/**
 * @api {post} /movies Add Movie to database
 * @apiName PostMovie
 * @apiGroup Movies
 *
 * @apiParam {String} name Movie name.
 * @apiParam {String[]} categoryIds Movie categorys.
 * @apiParam {Number} count Count of the Movie.
 * @apiParam {Number} fee Cost of the Movie.
 * 
 *
 * @apiSuccess {String} name Name of the Movie.
 * @apiSuccess {String[]} categoryIds  Categorys of the Movie.
 * @apiSuccess {Number} count  Count of the Movie.
 * @apiSuccess {Number} fee Cost of the Movie.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "name": "Star Trek",
 *       "categoryIds": ["sciFi", "adventure"],
 *       "count": 3,
 *        "fee": 5.99
 *     }
 *
 * @apiError MissingParameters There are missing parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "Bad Request",
 *       "details": "There are missing parameters"
 *     }
 */
// create movie (POST http://localhost:8080/api/movies)
router.post('/movies', function(req, res) {
  var movie = new Movie({ 
    name: req.body.name,
    categoryIds: req.body.categoryIds,
    count: req.body.count,
    fee: req.body.fee
  });
    if( req.body.name===undefined |  req.body.categoryIds===undefined | req.body.count===undefined |  req.body.fee===undefined)
      {   
        res.status(400).json({code: 400, message: "Bad Request", details: "There are missing parameters"});
      }
    else{
          movie.save(function(err) {
            if (err) throw err;

          console.log('Movie saved successfully');
          res.status(201).json(movie);
          });
        }
}); 

/**
 * @api {delete} /movies/:id Delete Movie from database
 * @apiName DeleteMovie
 * @apiGroup Movies
 *
 * @apiParam {Number} id Movie unique ID.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError MovieNotFound The id of the Movie was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found",
 *       "details": "There is no Movie with this ID"
 *     }
 */
// delete movie (DELETE http://localhost:8080/api/movies/:id)
router.delete('/movies/:id', function(req, res) {
  Movie.findOneAndRemove({ id: req.params.id }, function(err, movie) {
    if (err) throw err;
    
    if(movie == null){
      console.log('No movie found');
      res.status(404).json({code: 404, message: "Not Found", details: "There is no Movie with this ID"});
    }else{
      console.log('Movie deleted successfully');
      res.status(204);
    }
  });
}); 

/**
 * @api {patch} /movies/:id Update Movie
 * @apiName PatchMovie
 * @apiGroup Movies
 *
 * @apiParam {String} name Movie name.
 * @apiParam {String[]} categoryIds Movie categorys.
 * @apiParam {Number} count Count of the Movie.
 * @apiParam {Number} fee Cost of the Movie.
 * 
 *
 * @apiSuccess {String} name Name of the Movie.
 * @apiSuccess {String[]} categoryIds  Categorys of the Movie.
 * @apiSuccess {Number} count  Count of the Movie.
 * @apiSuccess {Number} fee Cost of the Movie.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "name": "Star Trek",
 *       "categoryIds": ["sciFi", "adventure"],
 *       "count": 3,
 *        "fee": 5.99
 *     }
 *
 * @apiError MovieNotFound The id of the Movie was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found",
 *       "details": "There is no Movie with this ID"
 *     }
 */
// update movie (PATCH http://localhost:8080/api/movies/:id)
router.patch('/movies/:id', function(req, res) {
  Movie.findOne({ id: req.params.id }, function(err, movie) {
    if (err) throw err;

    if(movie == null){
      console.log('No movie found');
      res.status(404).json({code: 404, message: "Not Found", details: "There is no Movie with this ID"});
    }
    else{
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
        res.status(200).json(movie);
      });
    }
  });
}); 

//////////////////////
/////// USERS ////////
//////////////////////

/**
 * @api {get} /users Request all Users
 * @apiName GetUsers
 * @apiGroup Users
 *
 *
 * @apiSuccess {User[]} users  all users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
      {
        "_id": "588b76d1a74fa8355824189c",
        "id": 2,
        "name": "Adam Kulczycki",
        "password": "password",
        "admin": false,
        "__v": 0,
        "movies": []
      },
      {
        "_id": "588b777a02753c1888b551a7",
        "id": 3,
        "name": "Daria Zadrożniak",
        "password": "password",
        "admin": false,
        "__v": 2,
        "movies": [
          6,
          3
        ]
      }
    ]
 *
 */
// all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// user by Id (GET http://localhost:8080/api/users/:id)
router.get('/movies/:id', function(req, res) {
  User.findOne({ id: req.params.id}, function(err, user) {
    if (err) throw err;
    if(user.length<1){res.status(404).json({code: 404, message: "Not Found", details: "There is no user with this ID"})}
    else{res.json(user)};
  });
}); 

// borrow a movie (POST http://localhost:8080/api/users/:user_id/movies/:movie_id)
router.post('/users/:user_id/movies/:movie_id', function(req, res){
  User.findOne({id: req.params.user_id}, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'User not found.' });
    }
    if (user) {
      if ( user.movies.indexOf(req.params.movie_id)>=0){
        res.json({ success: false, message: 'User already borrowed that movie' })
      } else{
        Movie.findOne({id: req.params.movie_id},function(err, movie){
          if(!movie){
            res.json({ success: false, message: 'Movie not found.' });
          }
          if(movie){
            if (movie.count < 1){
              res.json({ success: false, message: 'Movie out of stock'});
            }else{
              user.movies.push(movie.id);
              user.save(function(err) {
                if (err) throw err;

                console.log('User movies successfully updated!');
              });
              movie.count = movie.count - 1;
              movie.save(function(err) {
                if (err) throw err;

                console.log('Movie count successfully updated!');
              });  
              res.json({ success: true, message: 'Movie successfully borrowed'});              
            }
          }
        });
      }
    }

  });
});

// return movie (PATCH http://localhost:8080/api/users/:user_id/movies/:movie_id)
router.patch('/users/:user_id/movies/:movie_id', function(req, res){
  User.findOne({id: req.params.user_id}, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'User not found.' });
    }
    if (user) {
      if ( user.movies.indexOf(req.params.movie_id)<0){
        res.json({ success: false, message: 'User does not borrowed this movie' })
      } else{
        Movie.findOne({id: req.params.movie_id},function(err, movie){
          if(!movie){
            res.json({ success: false, message: 'Movie no longer in database.' });
          }
          if(movie){
            user.movies.splice(user.movies.indexOf(movie.id),1);
            user.save(function(err) {
              if (err) throw err;

              console.log('Movie successfully returned!');
            });
            movie.count = movie.count + 1;
            movie.save(function(err) {
              if (err) throw err;

              console.log('Movie count successfully updated!');
            });  
            res.json({ success: true, message: 'Movie successfully returned'});                          
          }
        });
      }
    }
  });    
});

// update user (PATCH http://localhost:8080/api/users/:id)
router.patch('/users/:id', function(req, res) {
  User.findOne({ id: req.params.id }, function(err, user) {
    if (err) throw err;

    if(user == null){
      console.log('User not found');
      res.status(404).json({code: 404, message: "Not Found", details: "There is no user with this ID"});
    }
    else{
      if (req.body.name){
        user.name = req.body.name;
      }
      if (req.body.password){
        user.password = req.body.password;
      }
      user.save(function(err) {
        if (err) throw err;

        console.log('User successfully updated!');
        res.status(200).json(user);
      });
    }
  });
}); 

module.exports = router;  