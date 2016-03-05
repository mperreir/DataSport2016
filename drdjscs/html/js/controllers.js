var app = angular.module('hyblabApp');

/*Whole page Controller*/

app.controller('MainCtrl', function ($scope) {
    
    $scope.x = "Jonathan Yue Chun";
    
});

/*Intro controller*/

app.controller('IntroCtrl', function ($scope) {
    
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
});

/*Page one controller*/

app.controller('PageOneCtrl', function ($scope) {
    
    $scope.z = "page tw0"; 
});

/*Page two controller*/

app.controller('PageTwoCtrl', function ($scope) {
    
});