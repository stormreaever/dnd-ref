angular.module('dndRef', []).controller('weaponsCtrl', function($scope) {
  
  $scope.weapons = [];
  
  getJSON('data/weapons.json',
    function(err, data) {
      if (err != null) {
        console.log('Error: ' + err);
      } else {
        console.log(data[0].name);
      }
    });

    
});


var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  xhr.send();
};