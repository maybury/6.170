var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var sessionSchema = new Schema({
SessionId    : ObjectId,
Username      : String,
Expires : Date
});
module.exports = mongoose.model('Session',sessionSchema);
