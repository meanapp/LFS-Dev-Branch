'use strict';

var myApp = angular.module('viewLeaveRecordCtrl', []);

myApp.controller('ViewLeaveRecordController', ['$scope', '$http', '$filter', 'DataService', 'UserFactory', 'ngTableParams', function($scope, $http, $filter, DataService, UserFactory, ngTableParams){
	var user = JSON.parse(UserFactory.getUser());
	$scope.projectName = user.projectId[0].ProjectName;	
	DataService.getAllUsersByProject(user.projectId[0]._id)
		.success(function(response) {
			$scope.users = response.users;
		});	

	$scope.statuses = [{
		id: '',
		name: ''
	},{
		id: 'approve',
		name: 'Approved'
	}, {
		id: 'pending',
		name: "Pending"
	}, {
		id: 'reject',
		name: 'Rejected'
	}, {
		id: 'cancelled',
		name: 'Cancelled'
	}];	
		

	$scope.updateStatus = function() {
		$scope.search = $scope.selectedStatus;
	};
	
	var data = DataService.data;
	console.log(data);

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 5
	}, {
		total: data.length,
		getData: function($defer, params) {
				DataService.getLeaveRecordByProject($defer, params, $scope.filter).then(function() {
					$scope.tableParams.settings({data: data, counts: []});
				});
		}
	});

	/*$http.get('http://localhost:3000/getLeaveRecordByProject/' + user.projectId[0]._id)
		.success(function(response, tableRender) {		
			if(response.status === 200) {
				$scope.leaves = response.leave;
				console.log(tableRender);
			}
		});*/

		/*$http.get('http://localhost:3000/getLeaveRecordsByUserId/' + id)
			.success(function(response) {
				if(response.status === 200) {
					$scope.leaves = response.leaves;
				}
			})
			.error(function(response) {
				console.log("Error");
			});*/

	$scope.showUserLeave = function(id) {
		$scope.currentUserID = id;
		$scope.tableParams = new ngTableParams({
			page: 1,
			count: 5
		}, {
			total: data.length,
			getData: function($defer, params) {				
				DataService.getLeaveRecordsByUser($defer, params, $scope.filter, $scope.currentUserID).then(function() {
					$scope.tableParams.settings({data: data, counts: []});
				});
			}
		});
	}
}]);