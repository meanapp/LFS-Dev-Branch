var Project = require('../models/index.js').project;
var mailer= require('../mailer.js');
var user = require('../models/UserModel.js');

exports.addProject = function(req, res) {
	user.findOne({emailAddress: req.body.emailAddress}, function(err, user1) {
		
		if(err) {
			res.json({status: 500, error: err});
		} /*else if(!user1) {
			res.json({status: 404, message: "User does not exists"});
		} */else {
					var project = new Project({ProjectManager: req.body.projectManager, ManagerEmailAddress: req.body.emailAddress, ProjectName: req.body.projectName});
					project.save(function(err) {
					if(err) {
							if(err.code == 11000) {
								res.json({status: 500, message: "Project already exists"});
							} else {
								res.json({status: 500, error: err});
							}			
					} else {
							res.json({status: 200, message: "Project saved"});
							
					}
				});
		}			
	});	
};

exports.getProjects = function(req, res) {
	Project.find({}, function(err, object) {
		if(err) {
			res.json({status: 500, error: err});
		} else {
			res.json({status: 200, project: object});
		}
	})
};

exports.getProjectsForManager = function(req, res) {
	user.findOne({_id: req.params.id}).populate('projectId').exec(function(err, userObj) {
		if(err) {
			res.json({status: 500, error: err});
		} else {
			res.json({status: 200, user: userObj});
		}
	});
}

exports.updateProjectManager = function(req, res) {
	Project.findOneAndUpdate({_id: req.params.id}, {ProjectManager: req.body.projectManager, ManagerEmailAddress: req.body.emailAddress}, function(err) {
		if(err) {
			res.json({status: 500, erorr: err});
		} else {
			res.json({status: 200, message: "Project Manager Details Updated"});
		}
	})
};

exports.updateProjectName = function(req, res) {
	Project.findOneAndUpdate({_id: req.params.id}, {ProjectName: req.body.projectName}, function(err) {
		if(err) {
			res.json({status: 500, error: err});
		} else {
			res.json({status: 200, message: "Project Name Updated"});
		}
	});
};

exports.deleteProject = function(req, res) {
	Project.remove({_id: req.params.id}, function(err) {
		if(err) {
			res.json({status: 500, error: err});
		} else {
			res.json({status: 200, message: "Project deleted successfully"});
		}
	});
}