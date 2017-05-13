app.controller('mainCtrl', function(saveData, $scope, $routeParams, $http, $filter) {
  
  
  $scope.searchText = '';
  
  $scope.selectedItem = {};
  $scope.detailTemplate = "";
  
  $scope.typing = false;
  
  
  $scope.template = {
    "detailsUrl": ""
  }
  
  var itemCategories = ['armor', 'weapons', 'spells', 'feats', 'items', 'races', 'classes', 'backgrounds'];
  
  // getData(itemCategories);
  
  var saved_data = saveData.get();
  
  if (saved_data.length > 0) {
    if (saved_data[0].data_type == saved_data[saved_data.length - 1].data_type) {
      getData(itemCategories);
    } else {
      $scope.items = saved_data;
    }
  } else {
    getData(itemCategories);
  }
  
  function getData(itemCategories) {
    
    $scope.items = [];
    
    for (var i = 0; i < itemCategories.length; i ++) {
      //build data url
      url = 'data/' + itemCategories[i] + '.json';
      
      // get more DATA
      $http.get(url).then(function (response) {
        var data = response.data;
        $scope.items = $scope.items.concat(data);
      });
    }
  };
  
  $scope.searchChange = function() {
    let searchList = $filter('filter')($scope.items, {name: $scope.searchText}, true);
    
    if ($scope.searchText.length > 0 || $scope.searchText.length == undefined ) {
      $scope.typing = true;
    } else {
      $scope.typing = false;
    }
    
    if (searchList.length == 1) {
      itemCategory = searchList[0].data_type;
      $scope.template.detailsUrl = "views/details/" + itemCategory + "-detail.html";
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
