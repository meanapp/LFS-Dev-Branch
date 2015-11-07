'use strict';

var app = angular.module('editLeaveRecordCtrl', []);

app.controller('EditLeaveRecordController', ['$scope', '$http', '$routeParams', '$location', '$filter','LeaveFactory', function($scope, $http, $routeParams, $location, $filter,LeaveFactory) {
	var recordID = $routeParams.recordID;
	LeaveFactory.getLeaveRecordById(recordID)
		.success(function(response) {
			console.log(response.leave);
			$scope.record = response.leave[0];
		});
    
    $scope.today = function() {
      $scope.startDate = new Date();
    };
     
     $scope.today();
  
    $scope.clear = function () {
      $scope.dt = null;
    };
    
    $scope.openStart = function($event) {
      $scope.startStatus.opened = true;
    };	
    
    $scope.openEnd = function($event) {
      $scope.endStatus.opened = true;
    };
    
    $scope.format = 'MM-dd-yyyy';
    
    $scope.startStatus = {
      opened: false
    };
    
    
    $scope.endStatus = {
      opened: false
    };
    
    $scope.$watch('startDate', function(newValue) {
      $scope.minEndDate = newValue;	
    });
    
    $scope.submit = function() {
        $scope.record.leaveStartDate = $filter('date')($scope.startDate, $scope.format);
        $scope.record.leaveEndDate = $filter('date')($scope.endDate, $scope.format); 
        
        LeaveFactory.cancelAndCreateLeave($scope.record)
            .success(function(response) {
               if(response.status === 200) {
                   alert("Leave Updated");
                   $location.path('/employee');
               } else {
                   alert("Error");
               }
            })
            .error(function(response){
                alert("Error");
            });
        
    }
    
}]);
