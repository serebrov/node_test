
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/documents')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer();
var db = mongoose.connect('mongodb://localhost/nodepad');

require('./models.js');
Document = mongoose.model('Document');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.list);

//List
app.get('/documents.:format', routes.list);
//app.get('/documents.:format', function(req, res){
    //Document.find({}, function(err, docs) {
        //switch(req.params.format) {
            //case 'json':
                //res.send(docs.map(function(d) {
                    //return d.__doc;
                //}));
                //break;
            //default:
                //res.render('documents/index.jade');
        //}
    //});
//});
//Create
app.post('/documents.:format?', routes.create);
//Read
app.get('/documents/:id.:format?', routes.read);
//Update
app.put('/documents/:id.:format?', routes.update);
//Delete
app.del('/documents/:id.:format?', routes.del);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
