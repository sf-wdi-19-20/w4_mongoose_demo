var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/test');
var Book = require('./models/book');

app.get('/', function (req, res) {
  res.send('hello world');
});

app.get('/api/books', function (req, res) {
  Book.find(function (err, books) {
    res.json(books);
  });
});

app.post('/api/books', function (req, res) {
  var newBook = new Book({
    title: req.body.title,
    author: req.body.author
  });
  newBook.save(function (err, savedBook) {
    res.json(savedBook);
  });
});

app.put('/api/books/:id', function (req, res) {
  var targetId = req.params.id;
  Book.findOne({_id: targetId}, function (err, foundBook) {
    foundBook.title = req.body.title;
    foundBook.author = req.body.author;

    foundBook.save(function (err, savedBook) {
      res.json(savedBook);
    });
  });
});

app.listen(3000, function () {
  console.log('server started on locahost:3000');
});