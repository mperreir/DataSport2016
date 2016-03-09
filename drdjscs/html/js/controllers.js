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
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Période de 1997 - 2015',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis1: {
                    axisLabel: 'Création d\'emplois',
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                yAxis2: {
                    axisLabel: 'Chômage en pourcentage',
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            },
            title: {
                enable: true,
                html: '<h2>Comparaison entre création d\'emplois et chômage</h2>'
            },
            subtitle: {
                enable: true,
                html: '<p style="color: red;">Données sur le pays de la loire Atlantique</p>'
            },
            css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
        };
        $scope.events = {
            someEvent1: function(e, scope){
                /* do smth, scope - is internal directive scope */
                alert("hello");
            },
            someEvent2: function(e, scope){
                /* do smth, scope - is internal directive scope */
            },
        };

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
    
    
    $scope.hello = function () {
        $scope.update1998();
    }
    
    $scope.options3 = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
                showControls: true,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };
    
    $scope.options2 = {
            chart: {
                type: 'sunburstChart',
                height: 450,
                color: d3.scale.category20c(),
                duration: 250
            }
        };

        $scope.data2 = [{
            "name": "ZoomInOrOut",
            "children": [

                {"name": "1997-1998", "size": 3938},
                {"name": "198-2005", "size": 3812},
                {"name": "HierarchicalCluster", "size": 6714},
                {"name": "MergeEdge", "size": 743}
                
            ]
        }];

 
}]);

/*Page one controller*/

app.controller('PageOneCtrl', function ($scope) {
    
});
/*Page two controller*/

app.controller('PageTwoCtrl', function ($scope) {
  
    
});





