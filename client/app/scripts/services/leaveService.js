'use strict';

var app = angular.module('leaveService', []);

app.factory('LeaveFactory', function($http) {

	var leaveFactory = {};
	this.leaveRecord = {};

	leaveFactory.createLeave = function(leave) {
		return $http.post('http://localhost:3000/createLeave', leave);
	};

	leaveFactory.getLeaveRecordById = function(recordID) {
		return $http.get('http://localhost: 3000/getLeaveRecordById/' + recordID);
	}

	return leaveFactory;
});