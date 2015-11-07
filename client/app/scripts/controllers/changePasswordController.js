'use strict';

var app = angular.module('changePasswordCtrl', []);

app.controller('ChangePasswordController', function($scope, $http, $location, $routeParams) {

	$http.get('http://localhost:3000/getUserDetails/' + $routeParams.id)
		.success(function(data) {
			if(data.status === 500 || data.status === 404) {
				alert('No records found !!');
				return;
			} else {
				$scope.user = data.user;
			}
	});

	$scope.submit = function() {		
		var user = {
			id: $scope.user._id,
			password: $scope.password
		}
		$http.post('http://localhost:3000/changePassword', angular.toJson(user))
			.success(function(data) {
				$location.path('/passwordSuccess');
			});
	};
});