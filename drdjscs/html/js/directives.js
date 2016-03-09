var app = angular.module('hyblabApp');


app.directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'map/france.svg',
        link: function (scope, element, attrs) {

        }
    }
}]);

app.directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
        },
        link: function (scope, element, attrs) {
    
        }
    }
}]);
