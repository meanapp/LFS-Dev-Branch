'use strict';

var app =angular.module('forgotPasswordCtrl', []);

app.controller('ForgotPasswordController', function($http, $scope, $location) {
	

	$scope.submit= function() {
		var email = {
			emailAddress: $scope.emailAddress
		};
		$http.post('http://localhost:3000/forgotPassword', angular.toJson(email))
		.success(function(data) {
			$location.path('/successPage')
		})
		.error(function() {
			alert('Server error!!');
		});
	};	
});