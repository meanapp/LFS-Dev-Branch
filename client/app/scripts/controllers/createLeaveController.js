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
    
    $scope.disabled = function (date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
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
    
	  $scope.showModalSuccess = false;
    $scope.showModalError = false;
    $scope.message = "";
    $scope.status = "";
    
	$scope.submit = function() {
    $scope.user.startDate = $filter('date')($scope.startDate, $scope.format);
    $scope.user.endDate = $filter('date')($scope.endDate, $scope.format);
		LeaveFactory.createLeave(angular.toJson($scope.user))
			.success(function(data) {
        if(data.status === 200) {            
          $scope.showModalSuccess = !$scope.showModalSuccess;           
          $scope.status = "success";
        } else if(data.status === 403) {
          $scope.showModalError = !$scope.showModalError;
          $scope.status = "error";
        }
			})
			.error(function(data) {				
          $scope.showModal = !$scope.showModal;
          $scope.status = "error";       
			});
	};
	  
});



app.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' +  
              '<div class="modal-body" style="text-align: center;"><h4>{{title}}</h4> <button class = "btn btn-primary modal-btn" ng-click="ok()">Ok</button></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
                
      }, controller: ['$scope', '$location', '$route', 'AuthToken', function($scope, $location, $route, AuthToken) {
          $scope.ok = function() {                        
            $(".modal-backdrop").hide();
            if($scope.$parent.status == 'success') {
              $location.path('/'+ AuthToken.getRole().toLowerCase());
            }  else {
              $route.reload();              
            }              
          }
      }]
    };
  });