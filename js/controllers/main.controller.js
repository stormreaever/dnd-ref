app.controller('mainCtrl', function($scope, $routeParams, $http, $filter) {
  
  
  $scope.items = [];
  $scope.searchText = '';
  
  $scope.selectedItem = {};
  $scope.detailTemplate = "";
  
  
  $scope.template = {
    "detailsUrl": ""
  }
  
  var itemCategories = ['armour', 'weapons'];
  
  getData(itemCategories);
  
  function getData(itemCategories) {
    
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
    let searchList = $filter('filter')($scope.items, $scope.searchText, true);
    
    if (searchList.length == 1) {
      itemCategory = searchList[0].data_type;
      $scope.template.detailsUrl = "views/details/" + itemCategory + "-detail.html";
      $scope.selectedItem = searchList[0];
    } else {
      $scope.template.detailsUrl = "";
    }
  };
  
  
});
