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
                res.render('documents/list', {title: "docs", documents: docs});
        }
    });
};

/*
 * GET a document.
 */
exports.read = function(req, res){
    Document.findById(req.params.id, function(err, d) {
     switch (req.params.format) {
       case 'json':
         res.send(d.__doc);
       break;

       default:
         res.render('documents/show.jade', {
           d: d
         });
     }
   });
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

exports.create_form = function(req, res) {
    res.render('documents/new.jade', {
        title: 'New Doc',
        d: new Document()
    });
};

/*
 * PUT update a document.
 */

exports.update = function(req, res){
    Document.findById(req.body.document.id, function(err, d) {
        d.title = req.body.document.title;
        d.data = req.body.document.data;
        d.save(function() {
            switch (req.params.format) {
                case 'json':
                    res.send(true);
                    break;
                default:
                    res.redirect('/documents');
            }
        });
    });
};

exports.update_form = function(req, res){
    Document.findById(req.params.id, function(err, d) {
        res.render('documents/edit.jade', {
            d: d
        });
    });
};
/*
 * DELETE a document.
 */

exports.del = function(req, res){
    Document.findById(req.params.id, function(err, d) {
        d.remove(function() {
            switch (req.params.format) {
                case 'json':
                    res.send(doc.__doc);
                    break;
                default:
                    res.redirect('/documents');
            }
        });
    });
};
