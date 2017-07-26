angular.module('scotchTodo', ['todoController', 'todoService', 'angular-route']);

angular.module('scotchTodo', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm"
    })
    .when("/character", {
        templateUrl : "character.html",
		controller : "CharacterController"
    })
    /* .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    }); */
});
