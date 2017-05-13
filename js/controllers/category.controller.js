app.controller('categoryCtrl', function(saveSort, saveData, $scope, $routeParams, $http, $filter) {
  
  $scope.category = $routeParams.category;
  $scope.item = $routeParams.item;
  
  console.log($scope.item);
  
  $scope.searchText = '';
  
  
  var saved_sort = saveSort.get();
  
  $scope.sortProperty = saved_sort.property;
  $scope.reverse = saved_sort.order;
  
  $scope.selectedItem = {};
  
  $scope.template = {
    "categoryUrl": "views/categories/" + $scope.category + ".html",
    "detailsUrl": ""
  }
  
  $scope.searchChange = function() {
    let searchList = $filter('filter')($scope.items, {name: $scope.searchText}, true);
    
    if (searchList.length == 1) {
      $scope.template.detailsUrl = "views/details/" + $scope.category + "-detail.html";
      $scope.selectedItem = searchList[0];
    } else {
      $scope.template.detailsUrl = "";
    }
  };
  
  $scope.selectItem = function(selectedItem) {
    //$scope.selectedItem = selectedItem;
    $scope.searchText = selectedItem;
    $scope.searchChange();
  };
  
  var saved_data = saveData.get();
  
  if (saved_data.length > 0) {
    if (saved_data[0].data_type != $scope.category || 
        saved_data[saved_data.length - 1].data_type != $scope.category) {
      getData('data/' + $scope.category + '.json');
    } else {
      $scope.items = saved_data;
      if ($scope.item !== undefined) {
        $scope.selectItem($scope.item);
      }
    }
  } else {
    getData('data/' + $scope.category + '.json');
  }
  
  
  
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.sortProperty === propertyName) ? !$scope.reverse : false;
    $scope.sortProperty = propertyName;
    
    saveSort.set($scope.sortProperty, $scope.reverse);
  };
  
  
  
  $scope.clearSearch = function() {
    $scope.searchText = '';
    $scope.searchChange();
  };
  
  function getData(url) {
    $http.get(url).then(function (response) {
        data = response.data;
        saveData.set(data);
        $scope.items = data;
        if ($scope.item !== undefined) {
          $scope.selectItem($scope.item);
        }
      });
  };
  
});
