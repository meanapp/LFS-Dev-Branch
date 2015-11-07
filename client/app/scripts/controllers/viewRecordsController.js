'use strict';

var app = angular.module('viewRecordsCtrl', []);

app.controller('ViewRecordsController', function($scope, $route, RecordsFactory, UserFactory) {

	var vm = this;
	vm.user = JSON.parse(UserFactory.getUser());

	RecordsFactory.getEmployeeRecords(vm.user._id)
		.success(function(data) {
			$scope.records = data.leave;			
		}).error(function(data) {
			$scope.records = 'No records found';
		});


	$scope.cancel = function(leaveID) {
		console.log('Clickeed');
		RecordsFactory.cancelLeave(leaveID)
			.success(function(data) {
				alert('Your leave is cancelled');
				$route.reload();
			})
			.error(function(data) {
				alert('Error is cancelling leave record');
			});
	};
});