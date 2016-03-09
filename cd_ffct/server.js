var express = require('express');
var path = require('path');
var app = express();

// serve static content from the html directory
app.use(express.static(path.join(__dirname, 'html')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/json', express.static(path.join(__dirname, 'json')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));

module.exports = app;
