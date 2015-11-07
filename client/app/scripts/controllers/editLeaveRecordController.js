'use strict';

var app = angular.module('editLeaveRecordCtrl', []);

app.controller('EditLeaveRecordController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	var record = $routeParams.recordID;
	$scope.record = record;
	console.log(record);
}]);