app.controller('categoryCtrl', function($scope, $routeParams, $http, $filter) {
  
  $scope.category = $routeParams.category;
  
  $scope.items = [];
  $scope.searchText = '';
  
  $scope.sortProperty = 'name';
  $scope.reverse = true;
  
  $scope.selectedItem = {};
  $scope.detailTemplate = "";
  
  $scope.template = {
    "categoryUrl": "views/categories/" + $scope.category + ".html",
    "detailsUrl": "views/details/" + $scope.category + "-detail.html"
  }
  
  $scope.items = getData('data/' + $scope.category + '.json');
  
  
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
    let searchList = $filter('filter')($scope.items, $scope.searchText, true);
    
    console.log(searchList);
    
    if (searchList.length == 1) {
      $scope.template.detailsUrl = "views/details/" + $scope.category + "-detail.html";
      $scope.selectedItem = searchList[0];
    } else {
      $scope.template.detailsUrl = "";
    }
  };
  
  function getData(url) {
    let data = [];
    $http.get(url)
      .then(function (response) {
        data = response.data;
        // parse weapon data
        if ($scope.category == "weapons") {
          data = parseWeaponProps(data);
        }
        $scope.items = data;
      });
  };
  
  // weapon data needs to be parsed a bit :/
  // concatenate the things in the properites array to get a nice string

  function parseWeaponProps(_weapons) {
    let weapons = _weapons;
    
    angular.forEach(weapons, function(value, key) {
      if (typeof value.properties !== 'undefined') {
        let properties_str = value.properties.sort().join(', ');
        weapons[key].properties_str = properties_str;
      }
    });
    return weapons;
  }  
  
});
