var appHyblab = angular.module('hyblabApp');


appHyblab.config(function($routeProvider){
    $routeProvider
        .when('/begin', {
            templateUrl: 'views/begin.html'
        })
        .when('/intro',{
            templateUrl: 'views/intro.html',
            controller: 'IntroCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    files: [
                        'js/tour.js'
                    ]
                }]
            }
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
        colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
        responsive: true,
        tooltipFillColor: "rgba(100,100,0,0.8)"
    });
    // Configure all line charts
    
    ChartJsProvider.setOptions('Line', {
        datasetFill: true
    });
    
}]);