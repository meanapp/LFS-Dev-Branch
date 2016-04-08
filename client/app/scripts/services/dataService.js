'use strict';

var app = angular.module('dataService', []);

app.factory('DataService', function($http, $filter, UserFactory) {


	var vm = this;

	var dataServiceFactory = {};

	dataServiceFactory.data = [];

	vm.user = JSON.parse(UserFactory.getUser());

	dataServiceFactory.count = 0;		

/*	dataServiceFactory.getPendingCount = function() {
		if(vm.user.projectId[0]._id) {
			return $http.get('http://localhost:3000/getPendingLeaveRecordByProject/' + vm.user.projectId[0]._id);
		}		
	};*/

	dataServiceFactory.getData = function($defer, params, filter, tableParams) {
		return $http.get('http://localhost:3000/getPendingLeaveRecordByProject/' + vm.user.projectId[0]._id)
					.success(function(response) {
						var filterData = $filter('filter')(response.record, filter);
						angular.copy(filterData, dataServiceFactory.data);
						var orderedData = params.sorting() ? $filter('orderBy')(filterData, params.orderBy()) : filterData;
        				$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			});
	};

	dataServiceFactory.getLeaveRecordByProject =  function($defer, params, filter, tableParams) {
		return $http.get('http://localhost:3000/getLeaveRecordByProject/' + vm.user.projectId[0]._id)
					.success(function(response) {
						var filterData = $filter('filter')(response.leave, filter);
						angular.copy(filterData, dataServiceFactory.data);
						var orderedData = params.sorting() ? $filter('orderBy')(filterData, params.orderBy()) : filterData;
        				$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			});
	};
	
	dataServiceFactory.getLeaveRecordsByUser =  function($defer, params, filter, usersId) {	
		return $http.get('http://localhost:3000/getLeaveRecordsByUserId/' + usersId)
					.success(function(response) {
						console.log(response);	
						var filterData = $filter('filter')(response.leaves, filter);
						angular.copy(filterData, dataServiceFactory.data);
						var orderedData = params.sorting() ? $filter('orderBy')(filterData, params.orderBy()) : filterData;
        				$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			});
	};

	dataServiceFactory.getAllUsersByProject = function(projectId) {
		return $http.get('http://localhost:3000/getAllUsersByProject/' + projectId);
	}
	return dataServiceFactory;
});