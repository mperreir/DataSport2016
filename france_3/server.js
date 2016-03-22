"use strict";

var express = require('express');
var path = require('path');
var app = express();

app.use('/', express.static(path.join(__dirname, 'build')));

/*var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('http://%s:%s', host, port);
});*/

module.exports = app;
