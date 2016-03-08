var app = angular.module('hyblabApp');

/*Whole page Controller*/

app.controller('MainCtrl', function ($scope) {
    
    $scope.x = "Jonathan Yue Chun";
    
   
});

/*Intro controller*/

app.controller('IntroCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.fix;
    $http.get('hyblabData/data.json').success(function(data) {
        $scope.data = data;
        $scope.fix = data;
    });
    
    $http.get('hyblabData/zoomData.json').success (function(data) {
         $scope.zoomData = data;
    });
     
     $scope.options = {
            chart: {
                type: 'multiChart',
                height: 450,
                margin : {
                    top: 30,
                    right: 60,
                    bottom: 50,
                    left: 70
                },
                color: d3.scale.category10().range(),
                //useInteractiveGuideline: true,
                duration: 1000,
                xAxis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis1: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                yAxis2: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };
        $scope.events = {
            
           chart: {

            // general chart and tooltip events
                dispatch: {
                    stateChange: function(e){ console.log('stateChange') },
                    changeState: function(e){ console.log('changeState') },
                    tooltipShow: function(e){ console.log('tooltipShow') },
                    tooltipHide: function(e){ console.log('tooltipHide') },
                    renderEnd: function(e){ console.log('renderEnd') }
                }

            }
            
        }
 
    $scope.update1996 = function () {    
        $scope.data = $scope.zoomData[0];
        $scope.graphInformation = $scope.textList[0].text;
    }
    $scope.update1998 = function () {
        $scope.data = $scope.zoomData[1];
        $scope.graphInformation = $scope.textList[1].text;
    }
    $scope.reset = function () {
        $scope.data = $scope.fix;
        $scope.graphInformation = $scope.textList[2].text;
    };
  
    /*DYNAMIC TEXT*/
    $scope.textList = [
        {id: 1, text: "This is a test!"},
        {id: 2, text: "Hope you like it :)"},
        {id: 3, text: "thank you for trying me ^^"},
        {id: 4, text: "'<h1>'Hello'</h1>'"}
    ];
    $scope.graphInformation = "Some random Text";
    

 
}]);

/*Page one controller*/

app.controller('PageOneCtrl', function ($scope) {
    
});
/*Page two controller*/

app.controller('PageTwoCtrl', function ($scope) {
  
    
});





