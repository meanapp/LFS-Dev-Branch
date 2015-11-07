'use strict';

var app = angular.module('dataService', []);

app.factory('DataService', function($http, $filter, UserFactory) {


	var vm = this;

	var dataServiceFactory = {};

	dataServiceFactory.data = [];

	vm.user = JSON.parse(UserFactory.getUser());

	dataServiceFactory.getData = function($defer, params, filter, tableParams) {
		return $http.get('http://localhost:3000/getPendingLeaveRecordByProject/' + vm.user.projectId[0]._id)
					.success(function(response) {
						console.log("Request sent" + response.record);
						var filterData = $filter('filter')(response.record, filter);
						angular.copy(filterData, dataServiceFactory.data);
						var orderedData = params.sorting() ? $filter('orderBy')(filterData, params.orderBy()) : filterData;
        				$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			});
	};
	return dataServiceFactory;
});