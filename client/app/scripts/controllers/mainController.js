'user strict';

var app = angular.module('mainCtrl', []);

app.controller('MainController', function($rootScope, $location, $http, Auth, UserFactory, AuthToken, DataService) {

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();
	vm.loggedInEmployee = Auth.isLoggedInEmployee();
	vm.loggedInManager = Auth.isLoggedInManager();

	/*DataService.getPendingCount().success(function(response) {		
		if(response) {
			vm.count = response.record.length;
		}		
	}); */

	
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();			
		vm.loggedInEmployee = Auth.isLoggedInEmployee();
		vm.loggedInManager = Auth.isLoggedInManager();
	});

	vm.doLogin = function() {
		vm.processing = true;
		vm.error = '';
				
		$http.post('http://localhost:3000/login', {
			email: vm.loginData.email,
			password: vm.loginData.password
		}).success(function(response) {
			if(response.success) {					
				UserFactory.setUser(response.user);
				AuthToken.setToken(response.token);
				AuthToken.setRole(response.user.role);	
				if(response.user.role === 'Manager') {
					$location.path('/manager');
				} else {
					$location.path('/employee');
				}
			} else {
				vm.error = response.message;
			}
		});
	};

	vm.doLogout = function() {
		Auth.logout();
		UserFactory.setUser();
		$location.path('/');
	};

	vm.root = function() {
		$location.path('/');
	}
});

app.factory('UserFactory', function($window) {

	var userFactory = {};

	userFactory.setUser =  function(user) {
		if(user) {
			$window.localStorage.setItem('user', JSON.stringify(user));
		} else {
			$window.localStorage.removeItem('user');
		}
	};

	userFactory.getUser = function() {
		return $window.localStorage.getItem('user');
	}

	return userFactory;
 });