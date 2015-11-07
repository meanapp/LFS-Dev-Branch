var Leave = require('../models/LeaveModel.js');
var User = require('../models/UserModel.js');
var mailer= require('../mailer.js');
var Project =require('../models/ProjectModel.js')


exports.createLeave = function(req, res) {
	User.findOne({_id: req.body.id}, function(err, user) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!user) {
			res.json({status: 404, message: "User not found"});
		} else {			
			var leave = new Leave({leaveStartDate: req.body.startDate, leaveEndDate: req.body.endDate, reason: req.body.reason, status: "Pending", auditCreateDt: Date.now(), userId: user._id, projectId: user.projectId});
			leave.save(function(err1, leaveObj) {
				if(err1) {
					res.json({status: 500, error: err});
				} else {
					console.log("Leave Object " + leaveObj);
					mailer.newLeaveRequestEmp(user.emailAddress,user.firstName,req.body.startDate,req.body.endDate);
					Project.findOne({_id: user.projectId},function(err2,project){
						if(err2||(!project)){
							res.json({status: 404,message: "manager not found"});
						}else{
							mailer.newLeaveRequestMgr(project.ManagerEmailAddress,user.firstName,req.body.startDate,req.body.endDate);
						}
					});
					res.json({status: 200, message: "Leave created"});
				}
			});
		}
 	});
};

exports.getLeaveRecordById = function(req, res) {
	Leave.find({_id: req.params.id}).populate('userId').populate('projectId').exec(function(err, leave) {
		if(err) {
			res.json({status: 500, error: err});			
		} else if(!leave) {
			res.json({status: 404, message: 'Leave record not found'});
		} else {
			res.json({status: 200, leave: leave});
		}
	});
}

exports.getLeaveRecordsByUserId = function(req, res) {
	Leave.find({userId: req.params.id}).populate('userId').populate('projectId').exec(function(err, leaveObj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!leaveObj) {
			res.json({status: 404, message: "No leave record found"});
		} else {
			res.json({status: 200, leave: leaveObj});
		}
 	});
};

exports.getLeaveRecordByProject = function(req, res) {
	Leave.find({projectId: req.params.id, status: {$in: ['Approve', 'Pending']}}).populate('userId').exec(function(err, leaveObj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!leaveObj) {
			res.json({success: false, message: "No leave record found"});
		} else {
			res.json({status: 200, leave: leaveObj});
		}
	});
};

exports.updateLeaveStatus = function(req, res) {
	Leave.findOneAndUpdate({_id: req.body.id}, {status: req.body.status}, function(err, leaveObj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!leaveObj) {
			res.json({status: 404, message: "No leave record found"});
		} else {
			User.findOne({_id: leaveObj.userId},function(err1,user){
				if(err1||(!user)){
					res.json("user not found!!!");
				}else{
					mailer.leaveStatus(user.emailAddress,user.firstName,req.body.status,leaveObj.leaveStartDate,leaveObj.leaveEndDate);	
				}
			  
			});
			res.json({status: 200, message: "Leave status updated!!"});
		}
	});
};

exports.cancelLeaveRecord = function(req, res) {
	Leave.findOneAndUpdate({_id: req.params.id}, {status: "Cancelled"}, function(err, leaveObj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!leaveObj) {
			res.json({status: 404, message: "Leave record not found"});
		} else {
			res.json({status: 200, message: "Leave Cancelled"});
		}
	});
};

exports.getPendingLeaveRecordByProject = function(req, res) {
	Leave.find({projectId: req.params.id, status: "Pending"}).populate('userId').exec(function(err, leaveObj) {
		if(err) {
			res.json({status: 500, error: err});
		} else if(!leaveObj) {
			res.json({status: 404, message: "Leave records not found"});
		} else {
			res.json({status: 200, record: leaveObj});
		}
	});

}

exports.cancelAndCreateLeave = function(req, res) {
	Leave.remove({_id: req.body._id}, function(err) {
		if(err) {
			res.json({status: 500, error: err});
		} else {
			var leave = new Leave({leaveStartDate: req.body.leaveStartDate, leaveEndDate: req.body.leaveEndDate, reason: req.body.reason, status: "Pending", auditCreateDt: Date.now(), userId: req.body.userId[0]._id, projectId: req.body.projectId[0]._id});
			leave.save(function(err1, leave) {
				if(err1) {
					res.json({status: 500, error: err1});
				} else {
					res.json({status: 200, message: 'Leave Updated'});
				}
			});			
		}
	});
}