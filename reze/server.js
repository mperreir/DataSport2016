// load express module for creating server
var express = require('express');
// create your server app
var app = express();
// specifing static files
app.use(express.static('html'));
// creating your server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
