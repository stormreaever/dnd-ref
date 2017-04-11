angular.module('core', []);

angular.module('core').filter('concatenate', function() {
  return function(properties) {
    if (typeof properties != 'undefined') {
      return properties.sort().join(', ');
    }
  };
});