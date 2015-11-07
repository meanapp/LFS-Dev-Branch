var mongoose = require('mongoose');
var async = require('async');
var Login = require('../models/LoginModel');

exports.validateUser = function(username) {
	var userObj = Login.findOne({userName: username}, function(err, user) {
		if(err) {
			return err;
		} else {
			return user;
		}
	});
	return userObj;
};

exports.validateAdmin = function(username, role) {
	var adminObj = Login.findOne({userName: username, role: role}, function(err, user) {
		if(err) {
			return err;
		} else {
			return user;
		}
	});
	return adminObj;

}