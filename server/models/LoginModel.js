var mongoose= require('mongoose');
var user = require('./UserModel.js');

var LoginSchema = new mongoose.Schema({	
	userName: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String
	},
	status: {
		type: String
	},
	auditCreateDt: {
		type: Date
	},
	userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('login', LoginSchema);