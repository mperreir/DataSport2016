var appHyblab = angular.module('hyblabApp');


appHyblab.directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'map/france.svg',
        link: function (scope, element, attrs) {

        }
    }
}]);

appHyblab.directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
        },
        link: function (scope, element, attrs) {
    
        }
    }
}]);
