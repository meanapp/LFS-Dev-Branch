'use strict';

var app = angular.module('createEmployeeCtrl', []);

app.controller('CreateEmployeeController', function($scope, $route, ManagerFactory, UserFactory) {

	var vm = this;
	vm.user = JSON.parse(UserFactory.getUser());

	ManagerFactory.getProjects()
		.success(function(data) {
			$scope.projects = data.project;
		});


	$scope.submitForm = function() {
		if ($scope.registerForm.$valid) {
			ManagerFactory.addEmployee(angular.toJson($scope.user))
				.success(function(data) {
					console.log(data);
						if(data.status==500){
							console.log(data.error);
							alert(data.message);
						}else{
					alert('User created successfully!!');
				}
					$route.reload();
				})
				.error(function(data) {
					alert('Error use creating employee');
				});
		}
	};
});