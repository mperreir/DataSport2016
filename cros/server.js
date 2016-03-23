var express = require('express');
var path = require('path');
var app = express();

// serve static content from the html directory
app.use(express.static(__dirname));

module.exports = app;
