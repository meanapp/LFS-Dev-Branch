var mongoose= require('mongoose');
var project = require('./ProjectModel.js');
//creating loginschema
var UserSchema = new mongoose.Schema({
 	
 	emailAddress:{
 		type: String,
 		required :true,
 		unique: true
 	},
 	role:{
 		type: String,
 		required :true
 	},
 	firstName:{
 		type: String,
 		required :true
 	},
 	lastName:{
 		type: String,
 		required :true
 	},
 	auditCreateDt: {
 		type: Date
 	},
 	lastLogin:{
 		type: Date
 	},
 	projectCount: {
 		type: Number
 	},
 	projectId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }]
 });


// Export the model schema.

module.exports= mongoose.model('user',UserSchema);




