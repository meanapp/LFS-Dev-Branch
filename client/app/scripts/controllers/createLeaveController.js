'use strict';

var app = angular.module('createLeaveCtrl', []);

app.controller('CreateLeaveController', function($scope, $route, $filter, UserFactory, LeaveFactory){

	var vm = this;

	vm.user = JSON.parse(UserFactory.getUser());
	$scope.user = {
   		projectId: vm.user.projectId[0]._id,
   		id: vm.user._id
  	};

	$scope.submit = function() {
		LeaveFactory.createLeave(angular.toJson($scope.user))
			.success(function(data) {
				alert('Your leave is created successfully!!');
				$route.reload();
			})
			.error(function(data) {
				alert('Leave could not be created !!');
			});
	};

	$scope.cancel = function() {
    	  $scope.user = "";
  	};
});

app.controller('DatepickerDemoCtrl', function ($scope, $timeout) {
  $scope.start = new Date('11/20/13');
  $scope.end = new Date();
  $scope.format = 'MM/dd/yyyy';

  $scope.minStartDate = 0; 
  $scope.maxStartDate = $scope.end; 
  $scope.minEndDate = $scope.start; 
  $scope.maxEndDate = 0; 
  
  $scope.$watch('user.start', function(v){
    $scope.minEndDate = v;
  });
  $scope.$watch('user.end', function(v){
    $scope.maxStartDate = v;
  });

  $scope.openStart = function() {
    $timeout(function() {
      $scope.startOpened = true;
    });
  };

  $scope.openEnd = function() {
    $timeout(function() {
      $scope.endOpened = true;
    });
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };
});
