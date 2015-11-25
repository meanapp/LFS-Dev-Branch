'user strict';

var app = angular.module('mainCtrl', []);

app.controller('MainController', function($rootScope, $location, Auth, UserFactory) {

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();
	vm.loggedInEmployee = Auth.isLoggedInEmployee();
	vm.loggedInManager = Auth.isLoggedInManager();

	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();			
		vm.loggedInEmployee = Auth.isLoggedInEmployee();
		vm.loggedInManager = Auth.isLoggedInManager();
	});

	vm.doLogin = function() {
		vm.processing = true;
		vm.error = '';

		Auth.login(vm.loginData.email, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;				
				if(data.success) {					
					UserFactory.setUser(data.user);
					if(data.user.role === 'Manager') {
						$location.path('/manager');
					} else {
						$location.path('/employee');
					}
				} else if(data.status === 401) {
					alert(data.message);
				} else {
					vm.error = data;
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