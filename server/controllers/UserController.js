var User = require('../models/UserModel.js');
var Login = require('../models/LoginModel.js');
var Project  = require('../models/ProjectModel.js');
var mailer= require('../mailer.js');

exports.addUser = function(req, res) {
	Project.findOne({_id: req.body.projectId}, function(err, proj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!proj) {
			res.json({status: 404, message: "Project does not exists!!"});
		} else {
			var user = new User({emailAddress: req.body.emailAddress, role: 'Employee', firstName: req.body.firstName, lastName: req.body.lastName, auditCreateDt: Date.now(), projectId: proj._id});
			user.save(function(err1, userObj) {
				if(err1) {
					if(err1.code === 11000) {
						res.json({status: 500, message: "User already exists"});
					} else {
						console.log("error " + err1)
						res.json({status: 500, error: err1});
					}
				} else {
					mailer.registerUser(req.body.emailAddress,req.body.firstName);
					var userLogin = new Login({userName: userObj.emailAddress, status: 'P', auditCreateDt: Date.now(), userId: userObj._id});
					userLogin.save(function(err2, loginObj) {
						if(err2) { 
							if(err2.code === 11000) {									
								User.remove({_id: userObj._id}, function(err3) {
									if(err3) {
										res.json({status: 5000, error: err3});
									} else {
										console.log("User removed");
										res.json({status: 500, message: "duplicate user entered in Login"});
									}
								});																
							} else {
									User.remove({_id: userObj._id}, function(err3) {
									if(err3) {
										res.json({status: 5000, error: err3});
									} else {
										console.log("User removed");
										res.json({status: 500, error: err2});
									}
								}); 								
							}							
						} else {
							res.json({status: 200, message: "User added!!"});
						}
					});
				}
			});
		}
	});
};

exports.updateRole = function(req, res) {
	User.findOneAndUpdate({_id: req.params.id}, {role: req.body.role}, function(err, user) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!!user) {
			res.json({status: 404, message: "User not found"});
		} else {
			res.json({status: 200, message: "User role updated!!"});
		}
	});
};

exports.updateFirstAndLastName = function(req, res) {
	User.findOneAndUpdate({_id: req.params.id}, {firstName: req.body.firstName, lastName: req.body.lastName}, function(err, user) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!!user) {
			res.json({status: 404, message: "user not found"});
		} else {
			res.json({status: 200, message: "First Name and Last Name updated!!"});
		}
	});
};

exports.getAllUsersByProject = function(req, res) {
	Project.findOne({_id: req.params.id}, function(err, proj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!proj) {
			res.json({status: 404, message: "Project does not exists"});
		} else {
			User.find({projectId: proj._id}).populate('projectId').exec(function(err1, user) {
				if(err1) {
					res.json({status: 500, error: err1});
				} else if(!user) {
					res.json({status: 404, message: "User not found"});
				} else {
					res.json({status: 200, users: user});
				}
			})
		}
	});
};

exports.changeProject = function(req, res) {
	Project.findOne({_id: req.body.projectId}, function(err, proj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!proj) {
			res.json({status: 404, message: "Project does not exists"});
		} else {
			User.findOneAndUpdate({_id: req.params.id}, {projectId: proj._id}, function(err1, user) {
				if(err1) {
					res.json({status: 500, error: err});
				} else if(!user) {
					res.json({status: 404, message: "user not found"});
				} else {
					res.json({status: 200, message: "Project changed"});
				}
			});
		}
	});
}

exports.addProjectToManager = function(req, res) {
	User.findOne({_id: req.params.id}, function(err, userObj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(userObj.projectId == req.params.projectId) {
			res.json({status: 403, message: 'Project is already added to Manager'});
		} else {
			userObj.projectId.push(req.params.projectId);
			User.findOneAndUpdate({_id: userObj._id}, {projectId: userObj.projectId}, function(err1, userObj1) {
				if(err1) {
					res.json({status: 500, error: err1});
				} else {
					Project.findOneAndUpdate({_id: req.params.projectId}, {ProjectManager: userObj1.firstName + " " + userObj1.lastName, ManagerEmailAddress: userObj1.emailAddress}, function(err2, projObj) {
						if(err2) {
							res.json({status: 500, error: err2});
						} else {
							res.json({status: 200, message: 'Project added!!'});
						}
					})
				}
			});
		}
	});
}

exports.getUserDetails = function(req, res) {
	Login.findOne({userId: req.params.id}, function(err, user) {
		if(err) {
			res.json({status: 500, message: 'Error'});
		} else if(!user) {
			res.json({status: 404, message: 'User not found'});
		} else {
			res.json({status: 200, user: user});
		}
	})
}