var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Document = new Schema({
    title : {type: String, index: true}
  , data  : String
  , tags  : String
  , user_id  : {type: Schema.ObjectId, index: true}
});
Document
.virtual('id')
.get(function(){
    return this._id.toHexString();
});
mongoose.model('Document', Document);
