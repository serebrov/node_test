var express = require('express')
  , mongoose = require('mongoose');
require('../models.js');
Document = mongoose.model('Document');

/*
 * GET list of documents.
 */
exports.list = function(req, res){
    Document.find({}, function(err, docs) {
        switch(req.params.format) {
            case 'json':
                res.send(docs.map(function(d) {
                    return d.__doc;
                }));
                break;
            default:
                res.render('views/index.jade');
        }
    });
};

/*
 * GET a document.
 */
exports.read = function(req, res){
};

/*
 * POST create a document.
 */

exports.create = function(req, res) {
    var doc = new Document(req.body['document']);
    doc.save(function() {
        switch (req.params.format) {
            case 'json':
                res.send(doc.__doc);
                break;
            default:
                res.redirect('/documents');
        }
    });
};

/*
 * PUT update a document.
 */

exports.update = function(req, res){
};

/*
 * DELETE a document.
 */

exports.del = function(req, res){
};
