"use strict";

var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');

// serve static content from the html directory
app.use(express.static(path.join(__dirname, 'html')));

app.get('/', function(req,res)
{
});


//app.use('/', express.static('html'));

module.exports = app;


