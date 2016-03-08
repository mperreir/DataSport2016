var express = require('express')
//var basicAuth = require('basic-auth-connect');
var app = express()


// password protection
//app.use(basicAuth('ds2016', 'iloveds'));

// declare the list of sub apps
var app_names = [];

var ds2016_names = ['cd_ffct', 'cd_tennis_de_table', 'creps',
 								'cros', 'drdjscs', 'fscf', 'france_3',
								'reze', 'saint_nazaire'];

app_names.push.apply(app_names, ds2016_names);

var sub_apps = [];

// create sub apps
// and register sub-apps
app_names.forEach( function( element, index, array) {
  console.log("Registering: " + element);
	sub_apps[element] = require('./' + element + '/server');
	app.use('/' + element, sub_apps[element]);
});

// redirect catch all url to hyblab website
app.use(/\/$/,function(req, res, next){
	res.redirect('http://www.hyblab.fr/evenements/hyblab-datajournalisme/');
});


// launch main server app
var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Hyblab DS 2016 routing app listening at http://%s:%s', host, port)

})
