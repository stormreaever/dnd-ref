app.controller('categoryCtrl', function(saveData, $scope, $routeParams, $http, $filter) {
  
  $scope.category = $routeParams.category;
  
  $scope.searchText = '';
  
  $scope.sortProperty = 'name';
  $scope.reverse = false;
  
  $scope.selectedItem = {};
  
  $scope.template = {
    "categoryUrl": "views/categories/" + $scope.category + ".html",
    "detailsUrl": ""
  }
  
  var saved_data = saveData.get();
  
  if (saved_data.length > 0) {
    if (saved_data[0].data_type != $scope.category || 
        saved_data[saved_data.length - 1].data_type != $scope.category) {
      getData('data/' + $scope.category + '.json');
    } else {
      $scope.items = saved_data;
    }
  } else {
    getData('data/' + $scope.category + '.json');
  }
  
  function getData(url) {
    $http.get(url).then(function (response) {
        data = response.data;
        saveData.set(data);
        $scope.items = data;
      });
  };
  
  
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
    let searchList = $filter('filter')($scope.items, {name: $scope.searchText}, true);
    
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
  
});
