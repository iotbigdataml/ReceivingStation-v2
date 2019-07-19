var app = angular.module("receivingstation", []);
app.controller("receivingcontroller", ['$scope', '$http', function ($scope, $http) {

  $scope.server_url="http://9ee6a80e.ngrok.io/api";
  $scope.bot_url="http://ad289656.ngrok.io";



  // Fetch data from url every one second
  setInterval(function () {
    $http({
      method: 'GET',
      url: $scope.server_url+'/orders/pending'

    }).then(function successCallback(response) {

      $scope.pending = response.data;

    }, function errorCallback(response) {

      // alert("Error. Try Again!");

    })
  }, 1000);

  setInterval(function () {
    $http({
      method: 'GET',
      url: $scope.server_url+'/orders/loaded'

    }).then(function successCallback(response) {

      $scope.loaded = response.data;

    }, function errorCallback(response) {

      //alert("Error. Try Again!");

    })
  }, 1000);

  // Function to control bot one
  $scope.botone = function () {

    $http({
      method: 'GET',
      url: $scope.bot_url+'/bot1'

    }).then(function successCallback(response) {



    }, function errorCallback(response) {

      alert("Error. Try Again!");

    });


  };


$scope.startmaintenencedata = function() {

  var parameter = JSON.stringify({ "station": "MAINTENANCE_START"});
  url = $scope.server_url + '/trips/update/bot/maintenance/start'
  $http.post(url, parameter).
    success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
    }).
    error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

};

$scope.stopmaintenencedata = function() {

  var parameter = JSON.stringify({ "station": "MAINTENANCE_STOP"});
  url = $scope.server_url + '/trips/update/bot/maintenance/stop'
  $http.post(url, parameter).
    success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
    }).
    error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

};  






$scope.botonedata = function (){
  var parameter = JSON.stringify({ "station": "RECV", "bot": "11" });
  url = $scope.server_url+'/trips/update/bot/departure'
  $http.post(url, parameter).
    success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
    }).
    error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });



};
  // Function to control bot two

  $scope.bottwo = function () {


    $http({
      method: 'GET',
      url: $scope.bot_url+'/bot2'

    }).then(function successCallback(response) {




    }, function errorCallback(response) {

      alert("Error. Try Again!");

    });


  };

$scope.bottwodata = function (){

  var parameter = JSON.stringify({ "station": "RECV", "bot": "12" });
  url = $scope.server_url+'/trips/update/bot/departure'
  $http.post(url, parameter).
    success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
    }).
    error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });



};

  // Function to put bots on maintenance

  $scope.maintainenceOn = function () {
    $http({
      method: 'GET',
      url: $scope.bot_url+'/entermaintenance'

    }).then(function successCallback(response) {




    }, function errorCallback(response) {

      alert("Error. Try Again!");

    });


  };

  // Function to put bots out of maintenance

  $scope.maintainenceOff = function () {
    $http({
      method: 'GET',
      url: $scope.bot_url+'/exitmaintenance'

    }).then(function successCallback(response) {


    }, function errorCallback(response) {

      alert("Error. Try Again!");

    });


  };


}]);

// filter to group orders by ID

app.filter("groupBy", ["$parse", "$filter", function ($parse, $filter) {
  return function (array, groupByField) {
    var result = [];
    var prev_item = null;
    var groupKey = false;
    var filteredData = $filter('orderBy')(array, groupByField);
    for (var i = 0; i < filteredData.length; i++) {
      groupKey = false;
      if (prev_item !== null) {
        if (prev_item[groupByField] !== filteredData[i][groupByField]) {
          groupKey = true;
        }
      } else {
        groupKey = true;
      }
      if (groupKey) {
        filteredData[i]['group_by_key'] = true;
      } else {
        filteredData[i]['group_by_key'] = false;
      }
      result.push(filteredData[i]);
      prev_item = filteredData[i];
    }
    return result;
  }
}]);
