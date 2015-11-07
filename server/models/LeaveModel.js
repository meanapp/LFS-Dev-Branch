var mongoose = require('mongoose');
var user = require('./UserModel.js');
var project = require('./ProjectModel.js');

//create leave schema
var LeaveSchema = new mongoose.Schema({

	leaveStartDate:{
		type:String,
		required: true
	},
	leaveEndDate:{
		type:String,
		required: true
	},
	reason:{
		type:String,
		required: true
	},
	status:{
		type:String
	},
	auditCreateDt: {
		type: Date
	},
	userId: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user' 
	}],
	projectId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }]	

});
//exporting the module
module.exports= mongoose.model('leave',LeaveSchema);

