// Dependency injections

var express = require("express"),
    bodyParser = require("body-parser"),
    http = require("http"),
    app = express(),
    nunjucks = require('nunjucks');

// Assigning the nunjucks view engine to render view in .html format on server serve

app.set('views',__dirname+'/views');
app.set('view engine', 'html');

// Configuring the nunjucks rendering engine

var env = nunjucks.configure(__dirname+'/views', {
    autoescape: true,
    express   : app
});

app.engine('html', nunjucks.render);

// Configuring the express middleware to parse response body as JSON for all the requests

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

// Configuring the port to start the server on

var port = 3000;

// Start the server the make the application listen on the port 3000

var server = http.createServer(app);
server.listen(process.env.PORT || port, function () {
    console.log('Started the Roster Bot app on port 3000');
});

// Delegating the request handling to the express router

require('./routes')(app);
