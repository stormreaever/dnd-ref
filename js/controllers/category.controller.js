app.controller('categoryCtrl', function(openPanes, saveList, saveSort, saveData, $scope, $routeParams, $http, $filter) {

  $scope.category = $routeParams.category;
  $scope.item = $routeParams.item;

  $scope.searchText = '';

  $scope.panes = openPanes.get();

  var saved_sort = saveSort.get();

  $scope.savedItems = saveList.get();

  $scope.sortProperty = saved_sort.property;
  $scope.reverse = saved_sort.order;

  $scope.selectedItem = {};

  $scope.template = {
    "categoryUrl": "views/categories/" + $scope.category + ".html",
    "detailsUrl": "",
    "paneSaveUrl": "views/panes/save.html",
    "paneInfoUrl": "views/panes/info.html"
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
    }
  } else {
    getData('data/' + $scope.category + '.json');
  }
  console.log(saved_data);



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

    });
  };

  $scope.saveItem = function(item) {
    var name = item.name;
    var item_index = false;

    for (var i = 0; i < $scope.savedItems.length; i++) {
      if ($scope.savedItems[i].name == name) {
        item_index = i;
      }
    }
    if ( item_index !== false ) {
      // item already exists. remove it
      $scope.savedItems.splice(item_index, 1);
    } else {
      // item is new. add it
      $scope.savedItems.push(item);
    }
    saveList.set($scope.savedItems);
  }

  $scope.itemWasSaved = function(item) {
    var name = item.name;
    var item_found = false;
    for (var i = 0; i < $scope.savedItems.length; i++) {
      if ($scope.savedItems[i].name == name) {
        item_found = true;
      }
    }
    return item_found;
  }

  $scope.togglePane = function(pane) {
    $scope.panes[pane] = !$scope.panes[pane];
    openPanes.set($scope.panes);
  }

});
