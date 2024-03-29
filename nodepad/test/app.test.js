process.env.NODE_ENV = 'test';

var app = require('../app')
  , assert = require('assert')
  , http = require('http');

function createDocument(title, after) {
  var d = new app.Document({ title: title });
  d.save(function() {
    var lastID = d._id.toHexString();
    after(lastID);
  });
}

module.exports = {

  'POST /documents.json': function(beforeExit) {
      var calls = 0;
      assert.response(app, {
          url: '/documents.json',
          method: 'POST',
          data: JSON.stringify({ document: {title: 'Test'} }),
          headers: { 'Content-Type': 'application/json' },
      }, {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
      },
      function(res) {
          ++calls;
          var document = JSON.parse(res.body);
          assert.equal('Test', document.title);
      });

      beforeExit(function(){
        //assert.equal(1, calls);
      })
  },

  'HTML POST /documents': function(beforeExit) {
    assert.response(app, {
        url: '/documents',
        method: 'POST',
        data: 'document[title]=test',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }, {
        //status: 302,
        //headers: { 'Content-Type': 'text/plain' }
        headers: { 'Content-Type': 'text/html' }
      });
  },

  'GET /documents/id.json': function(beforeExit) {
  },

  'GET /documents.json and delete them': function(beforeExit) {
    assert.response(app,
      { url: '/documents.json' },
      { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' }},
      function(res) {
        var documents = JSON.parse(res.body);
        assert.type(documents, 'object')

        documents.forEach(function(val, idx, array) {
          app.Document.findById(val._id, function(err, doc) {
            doc.remove();
          })
        });
      });
  },

  'GET /': function(beforeExit) {
    assert.response(app,
      { url: '/' },
      { status: 302, headers: { 'Content-Type': 'text/html' }},
      function(res) {
        //process.exit();
      });
  },

  'GET /documents': function(beforeExit) {
    assert.response(app,
      { url: '/documents' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      //{ status: 302, headers: { 'Content-Type': 'text/html' }},
      function(res) {
        assert.includes(res.body, '<title>Nodepad</title>');
        //process.exit();
      });
  }
};
