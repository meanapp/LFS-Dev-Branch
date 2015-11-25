'use strict';

var app = angular.module('authService', []);

app.factory('Auth', function($http, $q, AuthToken) {

	var authFactory = {};

	authFactory.login = function(email, password) {
		return $http.post('http://localhost:3000/login', {
			email: email,
			password: password
		}).success(function(data) {			
			if(data.success) {					
				AuthToken.setToken(data.token);
				AuthToken.setRole(data.user.role);	
			}
			return data;
		});
	};

	authFactory.logout = function() {
		AuthToken.setToken();
		AuthToken.setRole();
	};

	authFactory.isLoggedIn = function() {
		if(AuthToken.getToken()) 
			return true;
		else 
			return false;
	};

	authFactory.isLoggedInEmployee = function() {
		if(AuthToken.getRole() === 'Employee')
			return true;
		else 
			return false;
	};

	authFactory.isLoggedInManager = function() {
		if(AuthToken.getRole() === 'Manager')
			return true;
		else 
			return false;
	};
/*
	authFactory.getUserDetails = function() {
		if(AuthToken.getToken)  {			
			return $http.get('http://localhost:3000/getUserDetails/'+55f2b2ba1eb4d43016a32b47);
		}			
		else {
			return $q.reject({message: 'User has no token'});
		}			
	};*/

	return authFactory;
});

app.factory('AuthToken', function($window) {

	var authTokenFactory = {};

	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	};

	authTokenFactory.setToken = function(token) {
		if(token)
			$window.localStorage.setItem('token', token);
		else 
			$window.localStorage.removeItem('token');
	};

	authTokenFactory.getRole = function() {
		return $window.localStorage.getItem('role');
	};

	authTokenFactory.setRole = function(role) {
		if(role)
			$window.localStorage.setItem('role', role);
		else 
			$window.localStorage.removeItem('role');
	};

	return authTokenFactory;
});

app.factory('AuthInterceptor', function($q, $location, AuthToken) {

	var interceptorFactory = {};

	interceptorFactory.request = function(config) {
		var token = AuthToken.getToken();
		if(token) {
			config.headers['x-access-token'] = token;			
		}
		return config;
	}

	return interceptorFactory;
});
