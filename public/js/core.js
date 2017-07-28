angular.module('scotchTodo', ['todoController','todoService','ngRoute']);

angular.module('scotchTodo')
.config(function($routeProvider) {
    $routeProvider
	.when("/", {
        templateUrl : "views/home.html",
		controller : "mainController"
    })
	.when("/character", {
        templateUrl : "views/characters.html",
		controller : "CharacterController"
    })
	.when("/poem", {
		templateUrl : "views/poems.html",
		controller : "PoemController"
	})
	.otherwise("/");
});

 