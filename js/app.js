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
  .when("/category/:category/:item?", {
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

app.factory('saveData', function() {
  var savedData = {};
  savedData.items = [];
  function set(data) {
    savedData.items = data;
  }
  function get() {
    return savedData.items;
  }

  return {
    set: set,
    get: get
  }

});

app.factory('saveSort', function() {
  var savedSort = {};
  savedSort.property = 'name';
  savedSort.order = false;
  
  function set(property, order) {
    savedSort.property = property;
    savedSort.order = order;
  }
  function get() {
    return savedSort;
  }

  return {
    set: set,
    get: get
  }

});

app.factory('saveList', function() {
  var savedList = {};
  
  if (window.localStorage.getItem('savedItems') === null) {
    savedList.items = [];
  } else {
    savedList.items = angular.fromJson(window.localStorage['savedItems']);
  }
  
  function set(items) {
    savedList.items = items;
    window.localStorage['savedItems'] = angular.toJson(items);
  }
  function get() {
    return savedList.items;
  }

  return {
    set: set,
    get: get
  }

});

app.factory('openPanes', function() {
  var panes = {};
  
  if (window.localStorage.getItem('openPanes') === null) {
    openPanes = {
      'saved': false
    };
  } else {
    openPanes = angular.fromJson(window.localStorage['openPanes']);
  }
  
  function set(panes) {
    openPanes = panes;
    window.localStorage['openPanes'] = angular.toJson(openPanes);
  }
  function get() {
    return openPanes;
  }

  return {
    set: set,
    get: get
  }

});