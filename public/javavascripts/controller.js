

function UserTwoCtrl($scope, $http) {
  $http.get('home/data').success(function(data) {
    $scope.tablets = data
  })
}

function ShowItemDetailsControl($scope, $http) {
  $http.get('showItemDetails/data').success(function(data) {
    $scope.tablet = data;
    console.log(data[0].name);
  })
}
function round2Dezimal(x) { result = Math.round(x * 100) / 100 ; return result; }
