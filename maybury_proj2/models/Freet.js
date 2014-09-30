var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var FreetSchema = new Schema({
UserFreet     : String,
FreetText      : String,
UpdatedDate : Date,
DirectedAt : [String],
Tagged : [String]
});
module.exports = mongoose.model('Freet',FreetSchema);
