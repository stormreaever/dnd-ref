angular.module('core', []);

angular.module('core').filter('concatenate', function() {
  return function(properties) {
    if (typeof properties != 'undefined') {
      return properties.sort().join(', ');
    }
  };
});

angular.module('core').filter('money', function() {
  return function(money) {
    if (typeof money != 'undefined') {
    
      if (money % 1 == 0) {
        return money + " gp";
      }
      money = money * 10;
      if (money % 1 == 0) {
        return money + " sp";
      }
      money = money * 10;
      return money + " cp";
      
    }
    
  };
});