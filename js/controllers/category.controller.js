app.controller('categoryCtrl', function($scope, $routeParams, $http, $filter) {
  
  $scope.category = $routeParams.category;
  
  $scope.items = [];
  $scope.searchText = '';
  
  $scope.sortProperty = 'name';
  $scope.reverse = false;
  
  $scope.selectedItem = {};
  
  $scope.template = {
    "categoryUrl": "views/categories/" + $scope.category + ".html",
    "detailsUrl": ""
  }
  
  getData('data/' + $scope.category + '.json');
  
  
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.sortProperty === propertyName) ? !$scope.reverse : false;
    $scope.sortProperty = propertyName;
  };
  
  $scope.selectItem = function(selectedItem) {
    //$scope.selectedItem = selectedItem;
    $scope.searchText = selectedItem;
    $scope.searchChange();
  };
  
  $scope.searchChange = function() {
    let searchList = $filter('filter')($scope.items, $scope.searchText, true);
    
    if (searchList.length == 1) {
      $scope.template.detailsUrl = "views/details/" + $scope.category + "-detail.html";
      $scope.selectedItem = searchList[0];
    } else {
      $scope.template.detailsUrl = "";
    }
  };
  
  $scope.clearSearch = function() {
    $scope.searchText = '';
    $scope.searchChange();
  };
  
  function getData(url) {
    $http.get(url).then(function (response) {
        data = response.data;
        $scope.items = data;
      });
  };
  
});
