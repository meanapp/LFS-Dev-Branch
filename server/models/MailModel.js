var mongoose= require('mongoose');

var mailerSchema = new mongoose.Schema({
    userId:{type: String},
    templateName:{type:String},
    mailStatus:{type:String},
    mailTime:{type:Date}
});
module.exports = mongoose.model('mailer',mailerSchema);