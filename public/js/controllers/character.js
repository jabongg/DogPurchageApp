 (function(){
	 
	 "use strict";
	 
	 angular.module('scotchTodo')
		.controller('CharacterController',['$scope','$http','Todos','$location', function($scope, $http, Todos,$location) {
		$scope.formData = {};
		$scope.loading = true; 
		
			// getting all stories
			Todos.getPoem()
				.success(function(data) {
					$scope.writings = data;
					$scope.loading = false;
			});
			
		$scope.postPoem = function() {
				if ($scope.formData.poet != undefined && $scope.formData.poem != undefined) {
					$scope.loading = true;
					
					// call the createPoem function from our service (returns a promise object)
					Todos.createPoem($scope.formData) 
					.success(function(data) {
											// if successful creation, call our get function to get all the new todos
						$scope.loading = false;
						$scope.formData = {};
						$scope.writings = data;
					})

				}				
		};
 
		$scope.updatePoem = function(id) {
			$scope.loading = true;

			Todos.updatePoem(id)
				// if successful update, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.writings = data; // assign our new list of todos
				});

		}
		
	 function CharacterController() {
		 debugger;
		 console.log("CharacterController invoked");
		 
	 }	 
		}]); 
	 
 })();
 
 