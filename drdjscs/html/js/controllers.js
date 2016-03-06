var app = angular.module('hyblabApp');

/*Whole page Controller*/

app.controller('MainCtrl', function ($scope) {
    
    $scope.x = "Jonathan Yue Chun";
    
});

/*Intro controller*/

app.controller('IntroCtrl', ['$scope', '$http', function ($scope, $http) {
    
  $scope.someVar = [];
  $http.get('hyblabData/data.json').success(function(data) {
       console.log('success');
        $scope.someVar = data;
        //console.log(data);
        //console.log($scope.someVar);
    });
    console.log($scope.someVar);
   
    $scope.y = "yue chun";
    
    $scope.salesData = [
    {hour: 1,sales: 54},
    {hour: 2,sales: 66},
    {hour: 3,sales: 77},
    {hour: 4,sales: 70},
    {hour: 5,sales: 60},
    {hour: 6,sales: 63},
    {hour: 7,sales: 55},
    {hour: 8,sales: 47},
    {hour: 9,sales: 55},
    {hour: 10,sales: 30}
  ];
    
    $scope.transitionState = "active"
    $scope.cards = ["H1", 'h2', '55', 'aa'];
    
      $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
    
}]);

/*Page one controller*/

app.controller('PageOneCtrl', function ($scope) {
    
    $scope.z = "page tw0";
    $scope.a = false;
    $scope.setTrue = function () {
        $scope.a = true;
    };
    $scope.setFalse = function () {
        $scope.a = false;
    };
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];
    
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];
});

/*Page two controller*/

app.controller('PageTwoCtrl', function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];
    $scope.type = 'PolarArea';

    $scope.toggle = function () {
      $scope.type = $scope.type === 'PolarArea' ?
        'Pie' : 'PolarArea';
    };
});
