'use strict';

var app = angular.module('calendarService', []);

app.factory('CalendarFactory', function($http) {
	
	var calendarFactory = {};

	calendarFactory.getCalendarData = function(projectID) {
		return $http.get('http://localhost:3000/getLeaveRecordByProject/' + projectID);			
	}
	return calendarFactory;
});