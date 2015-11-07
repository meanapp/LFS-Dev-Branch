'use strict';

var app = angular.module('managerCtrl', []);

app.controller('ManagerController', function($scope, CalendarFactory, UserFactory) {
	var vm = this;
	var typeArray = ['important', 'warning', 'info', 'inverse', 'success', 'special', 'important', 'warning', 'info', 'inverse', 'success', 'special', 'important', 'warning', 'info', 'inverse', 'success', 'special', 'important', 'warning', 'info', 'inverse', 'success', 'special', 'important', 'warning', 'info', 'inverse', 'success', 'special', 'important', 'warning', 'info', 'inverse', 'success', 'special'];
	$scope.calendarView = 'month';
 	$scope.calendarDay = new Date();	
 	$scope.calendarTitle = moment().format('MMM Do YYYY');
	vm.user = JSON.parse(UserFactory.getUser());
	CalendarFactory.getCalendarData(vm.user.projectId[0]._id)
		.success(function(data) {
			$scope.events = [];
			for(var i = 0; i < data.leave.length; i++) {
					var eventObj = {	
			 			title: data.leave[i].userId[0].firstName + " " + data.leave[i].userId[0].lastName,
			 			type: typeArray[i],
			 			startsAt: new Date(data.leave[i].leaveStartDate), 
		    			endsAt: new Date(data.leave[i].leaveEndDate),
				    	resizable: true,
				    	incrementsBadgeTotal: true, 
				    	recursOn: 'year', 
				    	cssClass: 'a-css-class-name' 
					};
					$scope.events.push(eventObj);
				}
		});
});