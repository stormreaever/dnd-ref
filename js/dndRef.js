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
  .otherwise("/");
});

app.controller('mainCtrl', function($scope, $http, $filter) {
  
});

app.controller('weaponsCtrl', function($scope, $http, $filter) {
  
  $scope.weapons = [];
  $scope.searchText = '';
  
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
  
  $scope.selectItem = function(selectedItem) {
    $scope.selectedItem = selectedItem;
    $scope.searchText = selectedItem.name;
    console.log($scope.searchText);
    $scope.detailTemplate = "views/details/weapons-detail.html";
  };
  $scope.selectedItem = {};
  $scope.detailTemplate = "";
    
});

app.controller('armourCtrl', function($scope, $http, $filter) {
  
  $scope.armour = [];
  
  $scope.sortProperty = 'name';
  $scope.reverse = true;
  
  $scope.selectedItem = {};
  $scope.detailTemplate = "";
  
  $http.get("data/armour.json")
    .then(function (response) {
      let armour = response.data;
      
      $scope.armour = armour;
    });
  

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.sortProperty === propertyName) ? !$scope.reverse : false;
    $scope.sortProperty = propertyName;
  };
  
  $scope.selectItem = function(selectedItem) {
    //$scope.selectedItem = selectedItem;
    $scope.searchText = selectedItem.name;
    $scope.searchChange();
  };
  
  $scope.searchChange = function() {
    let searchList = $filter('filter')($scope.armour, $scope.searchText, true);
    
    console.log(searchList);
    
    if (searchList.length == 1) {
      $scope.detailTemplate = "views/details/armour-detail.html";
      $scope.selectedItem = searchList[0];
      //console.log($scope.searchText);
    } else {
      $scope.detailTemplate = "";
    }
  };
});