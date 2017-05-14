app.controller('categoryCtrl', function(saveList, saveSort, saveData, $scope, $routeParams, $http, $filter) {
  
  $scope.category = $routeParams.category;
  $scope.item = $routeParams.item;
  
  $scope.searchText = '';
  
  
  var saved_sort = saveSort.get();
  
  $scope.savedItems = saveList.get();
  
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
  
  
  // use the service to get an item array; only read the file if it doesn't already exist
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
      // assign the appropriate properties if an item had been saved
      for (var i = 0; i < $scope.items.length; i ++) {
        for (var j = 0; j < $scope.savedItems.length; j ++) {
          if ($scope.items[i].name == $scope.savedItems[j].name) {
            $scope.items[i].selected = 'selected';
          }
        }
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
      // if there's an item in the url, select it right away
      if ($scope.item !== undefined) {
        $scope.selectItem($scope.item);
      }
      // assign the appropriate properties if an item had been saved
      for (var i = 0; i < $scope.items.length; i ++) {
        for (var j = 0; j < $scope.savedItems.length; j ++) {
          if ($scope.items[i].name == $scope.savedItems[j].name) {
            $scope.items[i].selected = 'selected';
          }
        }
      }
    });
  };
  
  $scope.saveItem = function(item) {
    var index = $scope.items.indexOf(item);
    
    var item_already_exists = false;
    for (var i = 0; i < $scope.savedItems.length; i ++) {
      if ($scope.savedItems[i].name == item.name) {
        item_already_exists = true;
        $scope.savedItems.splice(i, 1);
        $scope.items[index].selected = '';
      }
    }
    if (!item_already_exists) {
      $scope.savedItems.push(item);
      $scope.items[index].selected = 'selected';
    }

    saveList.set($scope.savedItems);
    console.log($scope.savedItems);
  }
  
});
