var express = require('express');
var path = require('path');
var app = express();

// serve static content from the html directory
app.use(express.static(path.join(__dirname, 'html')));
app.use('/Libraries',express.static(path.join(__dirname, 'Libraries')));
app.use('/Ressources',express.static(path.join(__dirname, 'Ressources')));

module.exports = app;
