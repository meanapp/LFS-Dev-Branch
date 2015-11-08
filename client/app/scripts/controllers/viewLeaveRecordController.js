'use strict';

var myApp = angular.module('viewLeaveRecordCtrl', []);

myApp.controller('ViewLeaveRecordController', ['$scope', '$http', '$filter', 'DataService', 'UserFactory', function($scope, $http, $filter, DataService, UserFactory){
	var user = JSON.parse(UserFactory.getUser());
	$scope.projectName = user.projectId[0].ProjectName;	
	DataService.getAllUsersByProject(user.projectId[0]._id)
		.success(function(response) {
			$scope.users = response.users;
		});	
}]);