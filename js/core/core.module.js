angular.module('core', []);

angular.module('core').filter('concatenate', function() {
  return function(properties) {
    if (typeof properties != 'undefined') {
      return properties.sort().join(', ');
    }
  };
});

angular.module('core').filter('make_array', function() {
  return function(text) {
    if (typeof text === 'string') {
      var new_array = [string];
      return new_array;
    } else {
      return text;
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

angular.module('core').filter('url_escape', function() {
  return function(input) {
    if(input) {
      return window.encodeURIComponent(input); 
    }
    return "";
  }
});