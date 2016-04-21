
var app = angular.module('weatherApp', []);

app.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
  function fetchWeather(zip) {
    weatherService.getWeather(zip).then(function(data){
      $scope.place = data;
    });
  }

fetchWeather('94102');

  $scope.findWeather = function(zip) {
    $scope.place = '';
    fetchWeather(zip);
  };


}]);

 app.factory('weatherService', ['$http', '$q', function($http, $q) {
             function getWeather(zip) {
                 var deferred = $q.defer();
                 $http.get('http://api.openweathermap.org/data/2.5/forecast?zip='+ zip + ',us&mode=json&units=imperial' + '&appid=03a8a583c92ec96993abfe2c33b91779')
                     .success(function(data) {
                         deferred.resolve(data);
                     })
                     .error(function(err) {
                         console.log('Error retrieving zipcode');
                         deferred.reject(err);
                     });
                     return deferred.promise;
                 }
                 return {
                     getWeather: getWeather
                 };
             }]);
