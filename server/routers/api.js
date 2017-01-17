const router = require('express').Router(),
      storage = require('./../lib/storage.service'),
      _ = require('lodash'),
      mongodb = require('mongodb'),
      JSON = require('circular-json'),
      assert = require('assert');

      var ObjectId = require('mongodb').ObjectID;


router.get('/about', (req, res) => {
    res.json({
        name: 'Wypożyczalnia wideo "Pod 7 kotami"',
        hours: {
            monday: "9:00 - 19:00",
            thusday: "9:00 - 19:00",
            wednesday: "9:00 - 19:00",
            thursday: "9:00 - 19:00",
            friday: "9:00 - 19:00",
            saturday: "11:00 - 15:00",
            sunday: "Zamknięte"
        }
    });
});

router.post('/movies', function(req, res){
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/database';
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
  });

//////////USUWANIE Z MOVIES////////////////

router.delete('/movies/:_id', function(req,res){
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/database';
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
});

//////////WYBIERANIE POJEDYNCZE Z MOVIES////////////////

router.get('/movies/:_id', function(req,res){
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/database';
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
            console.log('Success')
            res.json(result);
          }
          db.close();
        });
      }
    });
});


/*router.get('movies/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
});*/

router.get('/movies', (req, res) => {
   res.json(storage.getAllMovies());
});

router.get('/movies/:category', (req, res) => {
    res.json(storage.getMoviesFrom(req.params.category))
});

router.post('/borrow', (req, res) => {
    if (!/\w+/.test(_.get(req, 'body.form.firstName', ''))) {
        res.status(500).send('Niepoprawne imię.');
        return;
    }
    if (!/\w+/.test(_.get(req, 'body.form.lastName', ''))) {
        res.status(500).send('Niepoprawne nazwisko.');
        return;
    }
    if (!/\d{9,10}/.test(_.get(req, 'body.form.phone'))) {
        res.status(500).send('Niepoprawny numer telefonu.');
        return;
    }
    if (storage.borrow(req.body.movieIds)){
        res.status(200).send();
    } else {
        res.status(500).send('Podczas składania zamówienia wystąpił problem.');
    }
});

module.exports = router;
