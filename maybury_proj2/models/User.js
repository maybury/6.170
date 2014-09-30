var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
Username     : String
, Password      : String
});
module.exports = mongoose.model('User',userSchema);
