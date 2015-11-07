var express = require('express');
var	bodyParser = require('body-parser');
var	methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');

//Create the application
 var app = express();

 //Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP_Method-Override'));
app.use(morgan('dev'));

 //CORS Support
 app.use(function (req,res,next){
 	res.header('Access-Control-Allow-Origin','*');
 	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
 	res.header('Access-Control-Allow-Headers','Content-Type');
 	next();
 });



//Connect to Mongo db
 mongoose.connect('mongodb://localhost/lfsdb');
 mongoose.connection.once('open',function(){
	
	//Load the models
	app.models =require('./models/index');

	//Load the routes
	app.all('/api/v1/*', [require('./middleware/validateRequest')]);
	app.all('api/v1/admin/*', [require('./middleware/validateAdminRequest')]);
	app.use('/', require('./routes'));

	

 	console.log('Listening on Port 3000');
 	app.listen(3000);
 })