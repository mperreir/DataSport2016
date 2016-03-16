var appHyblab = angular.module('hyblabApp');


appHyblab.config(function($routeProvider){
    $routeProvider
        .when('/begin', {
            templateUrl: 'views/begin.html'
        })
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
        .when('/pagethree', {
            templateUrl: 'views/pagethree.html',
            controller: 'PageThreeCtrl'
        })
        .when('/sidebarpage', {
            templateUrl: 'views/sidebarpage.html',
            controller: 'IntroCtrl'
        })
        .otherwise({
            redirectTo: '/begin'
        })
});

appHyblab.config (['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions ({
        colours: ['#FF5252', '#FF8A80', '#5D6369', '#5DA6E6'],
        responsive: true,
        tooltipFillColor: "rgba(100,100,0,0.8)"
    });
    // Configure all line charts
    
    ChartJsProvider.setOptions('Line', {
        datasetFill: true
    });
    
}]);