var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    usersRouter = require('../routes/listings.server.routes'),
    ordersRouter = require('../routes/orders.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  //app.use(bodyParser.json());
  //app.use(bodyParser.urlencoded({extended: true}));
  
  //app.use(bodyParser.json({limit: '50mb', extended: true}));
  //app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.use(bodyParser.json({limit: '10mb', extended: true}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


  /* Serve static files */
  app.use(express.static('client'));

  /* Uses the users router for requests to the api */
  app.use('/api/users', usersRouter);

  /* Uses the users router for requests to the api */
  app.use('/api/orders', ordersRouter);

  /* Goes to homepage for all routes not specified */
app.get('/*', function(req, res){
    res.redirect('/index.html');
  });  

  return app;
}; 
