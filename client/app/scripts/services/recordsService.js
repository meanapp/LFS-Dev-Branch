'use strict';

var app = angular.module('recordsService', []);

app.factory('RecordsFactory', function($http) {
	var recordsFactory = {};

	recordsFactory.getEmployeeRecords = function(userID) {
		return $http.get('http://localhost:3000/getLeaveRecordsByUserId/' + userID);
	};

	recordsFactory.cancelLeave = function(leaveID) {
		return $http.put('http://localhost:3000/cancelLeaveRecord/' + leaveID);
	}

	return recordsFactory;
});