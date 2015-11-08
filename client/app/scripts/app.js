'use strict';

var app = angular.module('clientApp', ['appRoute', 'authService', 'mainCtrl', 'calendarService', 'empCtrl', 'createLeaveCtrl', 'mwl.calendar', 'ui.bootstrap', 'ngTable', 'recordsService', 'viewRecordsCtrl', 'managerCtrl', 
	'managerService', 'createEmployeeCtrl', 'dataService' , 'approvalRequestCtrl', 'leaveService', 'forgotPasswordCtrl', 'changePasswordCtrl', 'validation.match', 'editLeaveRecordCtrl', 'viewLeaveRecordCtrl']);
/*
app.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});*/