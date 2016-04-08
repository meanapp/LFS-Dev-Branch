'use strict';

var app = angular.module('createEmployeeCtrl', []);

app.controller('CreateEmployeeController', function($scope, $route, ManagerFactory, UserFactory) {

	var vm = this;
	vm.user = JSON.parse(UserFactory.getUser());

	ManagerFactory.getProjects()
		.success(function(data) {
			$scope.projects = data.project;
		});

	$scope.showModalSuccess = false;
    $scope.showModalError = false;
    $scope.message = "";
    $scope.status = "";

	$scope.submitForm = function() {
		if ($scope.registerForm.$valid) {
			ManagerFactory.addEmployee(angular.toJson($scope.user))
				.success(function(data) {
					console.log(data);
					if(data.status==500){
						$scope.showModalError = !$scope.showModalError;
          				$scope.status = "error";
          				$scope.message = data.message;
					} else{
						$scope.showModalSuccess = !$scope.showModalSuccess;           
          				$scope.status = "success";
						$route.reload();
				}
			}).error(function(data) {
					$scope.showModalError = !$scope.showModalError;
          			$scope.status = "error";
          			$scope.message = data.message;
				});
		}
	};
});