var app = angular.module('app', ['ngRoute', 'core', 'ui.bootstrap']);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);
  
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

app.run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeSuccess', function(){
    ga('send', 'pageview', $location.path());
  });
});