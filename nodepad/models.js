var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Document = new Schema({
    title : {type: String, index: true}
  , data  : String
  , tags  : String
});
mongoose.model('Document', Document);
