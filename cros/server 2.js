"use strict";

var express = require('express');
var app = express();

app.use('/', express.static('./'));

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Application lancée à l\'adresse suivante http://%s:%s', host, port);
});

module.exports = app;