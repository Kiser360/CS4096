var app = angular.module('app', ['ngRoute']);

console.log("Loading App router");

app.config(["$routeProvider", function($routeProvider){
    $routeProvider
        .when('/', {
            controller: 'home',
            templateUrl: 'templates/home.html'
        })
        .otherwise('/');
}]);

console.log("Loaded Router");
