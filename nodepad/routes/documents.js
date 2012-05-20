var express = require('express')
  , mongoose = require('mongoose');
require('../models');
var Document = mongoose.model('Document');

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
                res.render('documents/list', {documents: docs});
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
                //res.redirect('/documents');
                res.render('documents/new.jade', {
                    d: new Document()
                });
        }
    });
};

/*
 * PUT update a document.
 */

exports.update = function(req, res){
    Document.findById(req.params.id, function(d) {
        switch (req.params.format) {
            case 'json':
                //res.send(doc.__doc);
                break;
            default:
                //res.redirect('/documents');
                res.render('documents/edit.jade', {
                    d: d
                });
        }
    });
};

/*
 * DELETE a document.
 */

exports.del = function(req, res){
};
