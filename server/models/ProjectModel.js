var mongoose= require('mongoose');

//creating project schema
var projectSchema = new mongoose.Schema({

    ProjectManager:{
    	type:String,    	
    },
    ManagerEmailAddress:{
    	type:String,    
    },
    ProjectName:{
    	type:String, 
        unique: true   	
    }
});

module.exports = mongoose.model('project',projectSchema);

