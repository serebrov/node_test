
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , routes_doc = require('./routes/documents')
  , mongoose = require('mongoose')
  , db
  , Document;

var app = module.exports = express.createServer();

require('./models');
app.Document = Document = mongoose.model('Document');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('test', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/nodepad-test');
});

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/nodepad-development');
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
  db = mongoose.connect('mongodb://localhost/nodepad-production');
});


// Routes

app.get('/', routes.index);

//List
app.get('/documents.:format?', routes_doc.list);
//Create
app.post('/documents.:format?', routes_doc.create);
app.get('/documents/new', routes_doc.create_form);
//Read
app.get('/documents/:id.:format?', routes_doc.read);
//Update
app.put('/documents/:id.:format?', routes_doc.update);
app.get('/documents/:id.:format?/edit', routes_doc.update_form);
//Delete
app.del('/documents/:id.:format?', routes_doc.del);

if (!module.parent) {
    app.listen(3000, function(){
        console.log(
            "Express server listening on port %d in %s mode",
            app.address().port, app.settings.env
        );
    });
}
