var app = angular.module('hyblabApp');

app.config(function($routeProvider){
    $routeProvider
        .when('/intro',{
            templateUrl: 'views/intro.html',
            controller: 'IntroCtrl'
        })
        .when('/pageone',{
            templateUrl: 'views/pageone.html',
            controller: 'PageOneCtrl'
        })
        .when('/pagetwo',{
            templateUrl: 'views/pagetwo.html',
            controller: 'PageTwoCtrl'
        })
        .otherwise({
            redirectTo: '/intro'
        })
});