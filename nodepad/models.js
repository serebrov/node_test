var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Document = new Schema({
    title : {type: String, index: true}
  , data  : String
  , tags  : String
  , user_id  : {type: Schema.ObjectId, index: true}
});
mongoose.model('Document', Document);
