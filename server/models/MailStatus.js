var mongoose=require('mongoose');

var mailStatusSchema= new mongoose.Schema({
	userEmailAddress:{
		type:String,
		required:true
	},
	time:{
		type: Date
	},
	status:{
		type:String,
		required:true
	}
});

//exporting model

module.exports=mongoose.model('mailStatus',mailStatusSchema);