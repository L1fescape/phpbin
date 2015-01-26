// Setup
// =======================================

// Import packages
var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

// Configure app to use bodyParser() for parsing POST body parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Variables and settings
var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';

// Serve static frontend assets (must be absolute path)
var dir = __dirname.split("/");
dir.pop();
dir = dir.join("/") + '/dist';
app.use(serveStatic(dir));

app.get('/s/:snippetID', function(req, res){
  res.sendFile('index.html', {root: dir});
});

// Create router
var router  = express.Router();

// Set router prefix
app.use('/api', router);

// Middleware for all api requests 
router.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Import resources
var Snippets = require('./api/snippet');

// Routes
// ------

// Get snippets
router.get('/snippet/:snippetID', function(req, res){
  var snippetID = req.params.snippetID;
  console.log(snippetID);
  Snippets.find(snippetID)
    .then(function(snippet){
      return res.json({
        success: true,
        results: [snippet],
        errors: []
      });
    })
    .fail(function(error){
      res.statusCode = 400;
      return res.json({
        success: false,
        results: [],
        errors: [error]
      });
    });
});

// Create snippets
router.post('/snippet', function(req, res){
  var snippet_info = {
    content: req.body.content
  };

console.log(snippet_info);

  Snippets.create(snippet_info)
    .then(function(snippet){
      return res.json({
        success: true,
        results: [snippet],
        errors: []
      });
    })
    .fail(function(error){
      res.statusCode = 400;
      return res.json({
        success: false,
        results: [],
        errors: [error]
      });
    });
});

// Start server
// =======================================

app.listen(port, host, function() {
  console.log('Listening on %s:%d', host, port);
});
