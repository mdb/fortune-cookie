var express = require('express'),
    bodyParser = require('body-parser'),
    fortuneCookie = require('./fortune_cookie');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) {
  res.status(200).send('Hello world!');
});

app.post('/fortune', fortuneCookie);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Fortune cookie listening on port ' + port);
});
