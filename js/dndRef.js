var app = angular.module('dndRef', ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "views/main.html",
    controller : "mainCtrl"
  })
  .when("/weapons", {
    templateUrl : "views/weapons.html",
    controller : "weaponsCtrl"
  })
  .when("/armour", {
    templateUrl : "views/armour.html",
    controller : "armourCtrl"
  })
  .otherwise( {
    templateUrl : "views/main.html",
    controller : "mainCtrl"
  });
});



app.controller('mainCtrl', function($scope, $http) {
  
});

app.controller('weaponsCtrl', function($scope, $http) {
  
  $scope.weapons = [];
  
  $http.get("data/weapons.json")
    .then(function (response) {
      let weapons = response.data;
      
      angular.forEach(weapons, function(value, key) {
        if (typeof value.properties !== 'undefined') {
          let properties_str = value.properties.join(', ');
          weapons[key].properties_str = properties_str;
        }
      });
      
      $scope.weapons = weapons;
    });
  
  $scope.sortProperty = 'name';
  $scope.reverse = true;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.sortProperty === propertyName) ? !$scope.reverse : false;
    $scope.sortProperty = propertyName;
  };
    
});

app.controller('armourCtrl', function($scope, $http) {
  
  $scope.armour = [];
  
  $http.get("data/armour.json")
    .then(function (response) {
      let armour = response.data;
      
      $scope.armour = armour;
    });
  
  $scope.sortProperty = 'name';
  $scope.reverse = true;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.sortProperty === propertyName) ? !$scope.reverse : false;
    $scope.sortProperty = propertyName;
  };
});