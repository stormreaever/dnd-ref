angular.module('dndRef', []).controller('weaponsCtrl', function($scope, $http) {
  
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
      
      console.log(weapons);
      
      $scope.weapons = weapons;
    });
  
  $scope.sortProperty = 'name';
  $scope.reverse = true;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.sortProperty === propertyName) ? !$scope.reverse : false;
    $scope.sortProperty = propertyName;
  };
    
});