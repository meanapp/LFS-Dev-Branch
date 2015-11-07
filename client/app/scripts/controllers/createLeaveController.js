'use strict';

var app = angular.module('createLeaveCtrl', []);

app.controller('CreateLeaveController', function($scope, $route, $filter, UserFactory, LeaveFactory){

	var vm = this;

	vm.user = JSON.parse(UserFactory.getUser());
	$scope.user = {
   		projectId: vm.user.projectId[0]._id,
   		id: vm.user._id
  	};

	
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
	
	$scope.cancel = function() {
    	  $scope.user = "";
  	};
	  
	$scope.submit = function() {
    $scope.user.startDate = $filter('date')($scope.startDate, $scope.format);
    $scope.user.endDate = $filter('date')($scope.endDate, $scope.format);
		LeaveFactory.createLeave(angular.toJson($scope.user))
			.success(function(data) {
        if(data.status === 200) {            
          alert('Your leave is created successfully!!');
          $route.reload(); 
        } else if(data.status === 403) {
          alert("Leave already exists");
        }
			})
			.error(function(data) {
				alert('Leave could not be created !!');
			});
	};
	  
});

