
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  api2 = require('./routes/api2'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);
app.get('/api2/CR2HP1', api2.CR2HP1);
app.get('/api2/CR2HP2', api2.CR2HP2);
app.get('/api2/CR2HP3', api2.CR2HP3);
app.get('/api2/CR3HP1', api2.CR3HP1);
app.get('/api2/CR3HP2', api2.CR3HP2);
app.get('/api2/CR3HP3', api2.CR3HP3);
app.get('/api2/CR3HP4', api2.CR3HP4);
app.get('/api2/Building', api2.building);
app.get('/api2/summary', api2.summary);
app.get('/api2/settings', api2.settings);

app.post('/api2/unitOn', api2.unitOn);
app.post('/api2/unitOff', api2.unitOff);
app.post('/api2/buildNo', api2.buildNo);
app.post('/api2/settingsPOST', api2.settingsPOST);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
