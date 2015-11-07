'use strict';

var app = angular.module('managerService', []);

app.factory('ManagerFactory', function($http) {

	var managerFactory = {};

	managerFactory.getProjects = function(userID) {
		return $http.get('http://localhost:3000/getProjects');
	}

	managerFactory.addEmployee = function(user) {
		return $http.post('http://localhost:3000/addUser', user);
	}

	return managerFactory;
});