// var express = require('express');
 var path = require('path');
// var favicon = require('serve-favicon');
 var logger = require('morgan');
// var mongodb = require("mongodb");
// var bodyParser = require('body-parser');


// var book = require('./routes/book');
// var app = express();

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({'extended':'false'}));
// app.use(express.static(path.join(__dirname, 'dist/mean-angular5')));
// app.use('/books', express.static(path.join(__dirname, 'dist/mean-angular5')));
// app.use('/book', book);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://127.0.0.1:27017/mean-angular5', { useMongoClient: true, promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


var express = require("express");

var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var book = require('./routes/book');

var CONTACTS_COLLECTION = "book";

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist/mean-angular5')));
app.use('/books', express.static(path.join(__dirname, 'dist/mean-angular5')));
//app.use('/book', book);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://127.0.0.1:27017/mean-angular5", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/book", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = app;
