// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var _          = require('underscore');     // underscore library for manipulation with objects
var bodyParser = require('body-parser');    // parsing HTTP Request body
var app        = express(); 				// define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(), 				// get an instance of the express Router
    jsonpFn = function(req, res) {
        var jsonStr = req.query.json || req.body.json || '{}',
            jsonObj = JSON.parse(jsonStr);

        setTimeout(function() {
            res.jsonp(jsonObj);
        }, 1000 + Math.random()*1000);
    },
    jsonFn = function(req, res) {
        var jsonStr = req.query.json || req.body.json || '{}',
            jsonObj = JSON.parse(jsonStr);
        setTimeout(function() {
            res.json(jsonObj);
        }, 1000 + Math.random()*1000);
    };

router
    .get('/echo/json/', jsonFn)
    .post('/echo/json/', jsonFn);

router
    .get('/echo/jsonp/', jsonpFn)
    .post('/echo/jsonp/', jsonpFn);


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// serve static content
app.use(express().use(express.static(__dirname)));
//app.use(express().use(vhost('www.domain.com.l', express.static(__dirname))));

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080; 		  // set our port
app.listen(port);
