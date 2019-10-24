
angular.module('querySelector.services', [])
.factory('APIservice', function($http) {

  var ergastAPI = {};

  ergastAPI.getQueries = function(url) {
    return $http({
      method: 'GET', 
      url: url
    });
  }
  ergastAPI.postQueries = function(url,data) {
    return $http({
      method: 'POST', 
      url: url,
      data:data
    });
  }
  ergastAPI.deleteQueries = function(url) {
    return $http({
      method: 'delete', 
      url: url
    });
  }

  return ergastAPI;
});