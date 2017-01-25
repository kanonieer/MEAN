var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var api         = require('./routes/api');
    
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//log requests
app.use(morgan('dev'));

// apply the routes to our application with the prefix /api
app.use('/api', api);
app.listen(port);
console.log('Listen at http://localhost:' + port);