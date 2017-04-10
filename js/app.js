var app = angular.module('app', ['ngRoute']);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  
  $routeProvider
  .when("/", {
    templateUrl : "views/main.html",
    controller : "mainCtrl"
  })
  .when("/category/:category", {
    templateUrl : "views/category.html",
    controller : "categoryCtrl"
  })
  .otherwise("/");
});