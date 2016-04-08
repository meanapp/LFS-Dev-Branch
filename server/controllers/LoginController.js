var Login = require('../models/LoginModel.js');
var User = require('../models/UserModel.js');
var Leave = require('../models/LeaveModel.js');
var genToken = require('../middleware/generateToken.js');
var mailer= require('../mailer.js');

exports.login = function(req, res) {
	Login.findOne({userName: req.body.email}, function(err, user) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!user) {
			res.json({status: 404, message: 'User not found'});
		} else {	
		console.log(user);
			if(user.password === req.body.password && user.status === 'A') {
				User.findOne({_id: user.userId}).populate('projectId').exec(function(err1, userObj) {
					if(err1) {
						res.json({status: 500, error: err1});
					} else if(!userObj) {
						res.json({status: 404, message: "User not found!"});
					} else {
						if(userObj.role === "Manager") {
							Leave.count({status: 'Pending'}, function(err, count) {
								if(err) {
									console.log("Error: " + err);
								} else {
									userObj["count"] = count;
									console.log("Count " + userObj.count);
									res.json(genToken(userObj));
								}								
							});
						} else {
							res.json(genToken(userObj));
						}						
					}
				});
			} else {
				res.json({status: 401, message: "Invalid credentials"});
			}
		}
	});
};


exports.updatePassword = function(req, res) {
	Login.findOneAndUpdate({userId: req.params.id}, {password: req.body.password, status: "A"}, function(err) {
		if(err) {
			res.json({status: 500, error: err});
		} else {
			res.json({status: 200, message: "Password Updated"});
		}
	})
};

exports.changePassword = function(req, res) {
	Login.findOneAndUpdate({_id: req.body.id}, {password: req.body.password,  status: "A"}, function(err) {
		if(err) {
			res.json({status: 500, error: err});
		} else {
			res.json({status: 200, message: "Password changed"});
		}
	});
};

exports.forgotPassword = function(req, res) {
	console.log('Inside forgotPassword ' + req.body.emailAddress);
	Login.findOne({userName: req.body.emailAddress}, function(err, user) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!user) {
			res.json({status: 404, message: req.body.email + " not found"});
		} else {
			mailer.resetPassword(req.body.emailAddress,user._id);
				Login.findOneAndUpdate({userName: req.body.email}, {password:"null",status:"P"}, function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("Password has been reset");
					}
				});
			res.json({status: 200, message: 'Mail sent to user'});
		}
	})
};

