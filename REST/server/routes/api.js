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
 * @api {post} /users Create User
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

/**
 * @api {post} /authentication authenticate User
 * @apiName PostAuthentication
 * @apiGroup Authentication
 *
 * @apiParam {String} name User name.
 * @apiParam {String} password User's password.
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     {
 *       "succes": true,
 *       "message": "Enjoy your token!",
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Im1vdmllcyI6ImluaXQiLCJfX3YiOiJpbml0IiwiYWRtaW4iOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwibmFtZSI6ImluaXQiLCJpZCI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsIm1vdmllcyI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJpZCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Im1vdmllcyI6W10sIl9fdiI6MCwiYWRtaW4iOmZhbHNlLCJwYXNzd29yZCI6InBhc3N3b3JkIiwibmFtZSI6IkFkYW0gS3VsY3p5Y2tpIiwiaWQiOjIsIl9pZCI6IjU4OGI3NmQxYTc0ZmE4MzU1ODI0MTg5YyJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W251bGxdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNDg1ODE2NzM5LCJleHAiOjE0ODU5MDMxMzl9.JA-QYeV8GhoT53-KerM4cdikz-SqucputtcpIndJBYs"
 *     }
 *
 * @apiError UserNotFound There is no User with this name.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "Bad Request",
 *       "details": "Authentication failed. User not found."
 *     }
 * 
 * @apiError BadPassword Password is incorret.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Unauthorized",
 *       "details": "Authentication failed. Wrong password."
 *     }
 */
// authenticate a user (POST http://localhost:8080/api/authentication)
router.post('/authentication', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.status(400).json({ code: 400, message: "Not Found",details: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.status(404).json({ code: 401, message:"Unauthorized",details: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 24*60*60// expires in 24 hours
        });

        // return the information including token as JSON
        res.status(201).json({
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
 *          "_id": "58890a95df23361c64d6a713",
            "id": 3,
            "__v": 0,
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
  Movie.findOne({ id: req.params.id}, function(err, movie) {
    if (err) throw err;
    if(!movie){res.status(404).json({code: 404, message: "Not Found", details: "There is no Movie with this ID"})}
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

/**
 * @api {get} /users/:id Request User information
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {ObjectID} _id ID from MongoDB.
 * @apiSuccess {Number} id  ID of the User.
 * @apiSuccess {String} name  Name of the User.
 * @apiSuccess {String} password  Paswword of the User.
 * @apiSuccess {Boolean} admin  Check if Admin.
 * @apiSuccess {Number} __v Versioning.
 * @apiSuccess {Movie[]} movies List of the borrowed Movies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "_id": "588b76d1a74fa8355824189c",
        "id": 2,
        "name": "Adam Kulczycki",
        "password": "password",
        "admin": false,
        "__v": 0,
        "movies": []
      }
 *
 * @apiError MovieNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found",
 *       "details": "There is no User with this ID"
 *     }
 */
// user by Id (GET http://localhost:8080/api/users/:id)
router.get('/users/:id', function(req, res) {
  User.findOne({ id: req.params.id}, function(err, user) {
    if (err) throw err;
    if(!user){res.status(404).json({code: 404, message: "Not Found", details: "There is no user with this ID"})}
    else{res.json(user)};
  });
}); 


/**
 * @api {post} /users/:user_id/movies/:movie_id Borrow a Movie
 * @apiName PostMovieToUser
 * @apiGroup Users
 *
 * @apiParam {Number} user_id User ID.
 * @apiParam {Number} movie_id Movie ID.
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "succes":true,
 *       "message":"Movie successfully borrowed"
 *     }
 *
 * @apiError UserNotFound There is User with this ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found",
 *       "details": "There is no User with this ID"
 *     }
 * 
 * @apiError AlreadyBorrowerd User borrowed this Movie before.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "code": 409,
 *       "message": "Conflict",
 *       "details": "User already borrowed that movie"
 *     }
 * 
 * @apiError MovieNotFound There is Movie with this ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found",
 *       "details": "There is no Movie with this ID"
 *     }
 * 
 * @apiError OutOfStock Quantity of this Movie is zero.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "code": 409,
 *       "message": "Conflict",
 *       "details": "Movie out of stock"
 *     }
 */

// borrow a movie (POST http://localhost:8080/api/users/:user_id/movies/:movie_id)
router.post('/users/:user_id/movies/:movie_id', function(req, res){
  User.findOne({id: req.params.user_id}, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(404).json({ code: 404, message:"Not Found", details: 'There is no User with this ID' });
    }
    if (user) {
      if ( user.movies.indexOf(req.params.movie_id)>=0){
        res.status(409).json({ code: 409, message: "Conflict", details: 'User already borrowed that movie' })
      } else{
        Movie.findOne({id: req.params.movie_id},function(err, movie){
          if(!movie){
            res.status(404).json({ code: 404, message:"Not Found", details: 'There is no Movie with this ID' });
          }
          if(movie){
            if (movie.count < 1){
              res.status(409).json({ code:409, message: "Conflict", details: 'Movie out of stock'});
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
              res.status(201).json({ success: true, message: 'Movie successfully borrowed'});              
            }
          }
        });
      }
    }

  });
});

/**
 * @api {patch} /users/:user_id/movies/:movie_id Update Borrowerd Movie
 * @apiName PatchBorrowerdMovie
 * @apiGroup Users
 * 
 * @apiParam {Number} user_id User ID.
 * @apiParam {Number} movie_id Movie ID.
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "success": true,
 *       "message": "Movie successfully returned",
 *     }
 *
 * @apiError UserNotFound There is User with this ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found",
 *       "details": "There is no User with this ID"
 *     }
 * 
 * @apiError NoBorrowerd User does not borrowed this movie.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "code": 409,
 *       "message": "Conflict",
 *       "details": "User does not borrowed this movie"
 *     }
 * 
 * 
 * @apiError NoMovie Movie no longer in database.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "code": 409,
 *       "message": "Conflict",
 *       "details": "Movie no longer in database"
 *     }
 */
// return movie (PATCH http://localhost:8080/api/users/:user_id/movies/:movie_id)
router.patch('/users/:user_id/movies/:movie_id', function(req, res){
  User.findOne({id: req.params.user_id}, function(err, user) {
    if (err) throw err;

    if (!user) {
       res.status(404).json({ code: 404, message:"Not Found", details: 'There is no User with this ID' });
    }
    if (user) {
      if ( user.movies.indexOf(req.params.movie_id)<0){
        res.status(409).json({ code:409, message: "Conflict", details: 'User does not borrowed this movie' })
      } else{
        Movie.findOne({id: req.params.movie_id},function(err, movie){
          if(!movie){
            res.status(409).json({ code:409, message: "Conflict", details: 'Movie no longer in database.' });
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
            res.status(201).json({ success: true, message: 'Movie successfully returned'});                          
          }
        });
      }
    }
  });    
});

/**
 * @api {patch} /users/:id Update User
 * @apiName PatchUser
 * @apiGroup Users
 *
 * @apiParam {String} name User name.
 * @apiParam {String} password User password.
 * 
 *
 * @apiSuccess {ObjectID} _id ID from MongoDB.
 * @apiSuccess {Number} id  ID of the User.
 * @apiSuccess {String} name  Name of the User.
 * @apiSuccess {String} password  Paswword of the User.
 * @apiSuccess {Boolean} admin  Check if Admin.
 * @apiSuccess {Number} __v Versioning.
 * @apiSuccess {Movie[]} movies List of the borrowed Movies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "_id": "588b76d1a74fa8355824189c",
        "id": 2,
        "name": "Adam Kulczycki",
        "password": "password",
        "admin": false,
        "__v": 0,
        "movies": []
      }
 *
 *
 * @apiError UserNotFound The ID of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found",
 *       "details": "There is no User with this ID"
 *     }
 */
// update user (PATCH http://localhost:8080/api/users/:id)
router.patch('/users/:id', function(req, res) {
  User.findOne({ id: req.params.id }, function(err, user) {
    if (err) throw err;

    if(user == null){
      console.log('User not found');
      res.status(404).json({code: 404, message: "Not Found", details: "There is no User with this ID"});
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