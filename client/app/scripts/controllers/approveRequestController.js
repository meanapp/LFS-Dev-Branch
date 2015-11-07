'use strict';

var app = angular.module('approvalRequestCtrl', []);

app.controller('ApproveRequestController', function($scope, $route, $http, ngTableParams, $window, DataService) {

	var vm = this;
	var data = DataService.data;

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10
	}, {
		total: data.length,
		getData: function($defer, params) {
				DataService.getData($defer, params, $scope.filter).then(function() {
					$scope.tableParams.settings({data: data, counts: []});
				});
		}
	});

	$scope.requestAction = function(leaveId, action) {
		var data = {
			id: leaveId,
			status: action
		};
		$http({
			url: 'http://localhost:3000/updateLeaveStatus',
			method: 'POST',
			data: JSON.stringify(data)
		}).success(function(response) {
			$route.reload();
		}).error(function(response) {
			alert('Could not complete your action, due to an error!!');
		});
	}
});