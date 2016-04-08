'use strict';

var app = angular.module('viewRecordsCtrl', []);

app.controller('ViewRecordsController', function($scope, $route, RecordsFactory, UserFactory) {

	var vm = this;
	vm.user = JSON.parse(UserFactory.getUser());

	RecordsFactory.getEmployeeRecords(vm.user._id)
		.success(function(data) {
			$scope.records = data.leaves;					      
		}).error(function(data) {
			$scope.records = 'No records found';
		});


	  $scope.showModalSuccess = false;
    $scope.showModalError = false;

	$scope.cancel = function(leaveID) {
		RecordsFactory.cancelLeave(leaveID)
			.success(function(data) {
        	console.log('Clickeed');
				$scope.showModalSuccess = !$scope.showModalSuccess;    
			})
			.error(function(data) {
        	console.log('Clickeed');
				$scope.showModalError = !$scope.showModalError;
			});
	};
});

app.directive('modalCancel', function () {
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
                
      }, controller: ['$scope', '$route', function($scope, $route) {
          $scope.ok = function() {      
            $(".modal-backdrop").hide();            
            $route.reload();            
            $route.reload();               
          }
      }]
    };
  });