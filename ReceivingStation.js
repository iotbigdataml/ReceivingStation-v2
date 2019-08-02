var app = angular.module("receivingstation", []);
app.controller("receivingcontroller", ['$scope', '$http', function ($scope, $http) {

  $scope.server_url="http://ec2-3-84-43-140.compute-1.amazonaws.com:3000/api";
  $scope.bot_url="http://e192b53e.ngrok.io";
  
  // Fetch data from url every one second
  setInterval(function () {
    $http({
      method: 'GET',
      url: $scope.server_url+'/orders/pending'

    }).then(function successCallback(response) {
      $scope.red=0
      $scope.blue=0
      $scope.green=0
      $scope.yellow=0
      $scope.white=0
      $scope.black=0

      $scope.pending = response.data;
      angular.forEach($scope.pending.Orders, function(value, key) {
       if(value.productID == 1) 
       $scope.red = $scope.red + value.qtyOnTrip;
        else if(value.productID == 2)
        $scope.green = $scope.green + value.qtyOnTrip;
        else if(value.productID == 3)
        $scope.blue = $scope.blue + value.qtyOnTrip; 
        else if(value.productID == 4)
        $scope.black = $scope.black + value.qtyOnTrip;
        else if(value.productID == 5)
        $scope.yellow = $scope.yellow + value.qtyOnTrip;
        else if(value.productID == 6)
        $scope.white = $scope.white + value.qtyOnTrip;
      });
   }, function errorCallback(response) {

      // alert("Error. Try Again!");

    })
  }, 1000);

  

  // Function to control bot one
  $scope.botone = function () {
    $http({
      method: 'GET',
      url: $scope.bot_url+'/bot1'

    }).then(function successCallback(response) {



    }, function errorCallback(response) {

      console.log("Error bot 1");

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

$scope.botstart = function (){
  $http.post($scope.server_url+'/loadTrip', JSON.stringify()).then(function (response) {

    
    
    }, function (response) {
    
    });


};
  // Function to control bot two

  $scope.bottwo = function () {


    $http({
      method: 'GET',
      url: $scope.bot_url+'/bot2'

    }).then(function successCallback(response) {




    }, function errorCallback(response) {

      alert("Error place1");

    });


  };

$scope.bottwodata = function (){

  var parameter = JSON.stringify({ "" : "" });
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
