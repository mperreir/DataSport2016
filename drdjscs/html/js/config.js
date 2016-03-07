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

app.config (['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions ({
        colours: ['#FF5252', '#FF8A80'],
        responsive: true 
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: true
    });
    
}]);