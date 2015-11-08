'use strict';

var app = angular.module('appRoute', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {

/*	$locationProvider.html5Mode(true);*/

	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html'
		})
		.when('/manager', {
			templateUrl: 'views/managerView.html',
			controller: 'ManagerController'
		})
		.when('/employee', {
			templateUrl: 'views/employeeView.html',
			controller: 'EmployeeController'
		})
		.when('/createLeave', {
			templateUrl: 'views/createLeave.html',
			controller: 'CreateLeaveController'
		})
		.when('/viewRecords', {
			templateUrl: 'views/viewRecords.html',
			controller: 'ViewRecordsController'	
		})
		.when('/addEmployee', {
			templateUrl: 'views/createEmployee.html',
			controller: 'CreateEmployeeController'
		})
		.when('/approveRequest', {
			templateUrl: 'views/approveRequest.html',
			controller: 'ApproveRequestController'
		})
		.when('/forgotPassword', {
			templateUrl: 'views/forgotPassword.html',
			controller: 'ForgotPasswordController'
		})
		.when('/changePassword/:id', {
			templateUrl: 'views/changePassword.html',
			controller: 'ChangePasswordController'
		})
		.when('/successPage', {
			templateUrl: 'views/successPage.html'
		})
		.when('/passwordSuccess', {
			templateUrl: 'views/passwordSuccessPage.html'
		})
		.when('/editLeaveRecord/:recordID', {
			templateUrl: 'views/editLeaveRecord.html',
			controller: 'EditLeaveRecordController'
		})
		.when('/viewLeaveRecords', {
			templateUrl: 'views/viewLeaveRecords.html',
			controller: 'ViewLeaveRecordController'
		})
		.otherwise({ redirectTo: '/'});
});