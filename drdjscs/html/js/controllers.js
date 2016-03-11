var app = angular.module('hyblabApp');

/*Whole page Controller*/

app.controller('MainCtrl', function ($scope) {
      
   
});

/*Intro controller*/

app.controller('IntroCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $http.get('hyblabData/data.json').success (function(data) {
        $scope.data = data;
        $scope.fix = data;
    });
    
    $http.get('hyblabData/zoomData.json').success (function(data) {
        $scope.zoomData = data;
    });
    $http.get('hyblabData/pieData.json').success (function(data) {
        $scope.pieData = data;
        $scope.pieDynamicData = data[0];
    });
    
    /*$scope.options = {
            chart: {
                type: 'multiChart',
                height: 340,
                margin : {
                    top: 30,
                    right: 60,
                    bottom: 50,
                    left: 70
                },
                color:  ['rgba(0, 175, 155, 1)','rgba(182, 174, 195, 1)'],

                useInteractiveGuideline: true,
                duration: 4000,
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    //axisLabel: 'Période de 1997 - 2015',
                    tickFormat: function(d){
                        return d3.format('f')(d);
                    }
                },
                yAxis1: {
                    //axisLabel: 'Création d\'emplois',
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                yAxis2: {
                    //axisLabel: 'Chômage en pourcentage',
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            },
            tooltip: {
                contentGenerator: function (e) {
                  var series = e.series[0];
                  if (series.value === null) return;
                  
                  var rows = 
                    "<tr>" +
                      "<td class='key'>" + 'Time: ' + "</td>" +
                      "<td class='x-value'>" + e.value + "</td>" + 
                    "</tr>" +
                    "<tr>" +
                      "<td class='key'>" + 'Voltage: ' + "</td>" +
                      "<td class='x-value'><strong>" + (series.value?series.value.toFixed(2):0) + "</strong></td>" +
                    "</tr>";

                  var header = 
                    "<thead>" + 
                      "<tr>" +
                        "<td class='legend-color-guide'><div style='background-color: red;" + series.color + ";'></div></td>" +
                        "<td class='key'><strong>" + series.key + "</strong></td>" +
                      "</tr>" + 
                    "</thead>";
                    
                  return "<table>" +
                      header +
                      "<tbody>" + 
                        rows + 
                      "</tbody>" +
                    "</table>";
                } 
              }
        };*/
    
    $scope.options = {
            chart: {
              type: 'multiChart',

           
              

              height: 340,
              margin : {
                  top: 30,
                  right: 60,
                  bottom: 50,
                  left: 70
              },
              x: function(d){ console.log(d.y); return d.x; },
              y: function(d){ return d.y; },
              transitionDuration: 100,
              color: ['rgba(0, 175, 155, 1)','rgba(182, 174, 195, 1)'],

              xAxis: {
                  //axisLabel: 'Time (ms)'

                  // showMaxMin: false,
                  // staggerLabels: true

              },
              yAxis: {
                  //axisLabel: 'Voltage (v)',
                  showMaxMin: false,
                  tickFormat: function(d){
                      return d3.format('.02f')(d);
                  },
                  axisLabelDistance: -300
              },
              useInteractiveGuideline: false,
              interpolate:'basis',
            
              tooltip: {
                contentGenerator: function (e) {
                  //var series = e.series[0];
                  //console.log(e);
                  //if (series.value === null) return;

                  return "<div class='toolTip'><h2>22</h2><p>EMPLOI CRÉES</p><h1>en 1996</h1></div>";

                  
                } 
              },
              callback: function(){
                  d3.selectAll('.nvd3.nv-legend g').style('fill', "red");
                }
            }
        };
        
    $scope.update19961998 = function () {    
        $scope.data = $scope.zoomData[0];
        $scope.pieDynamicData = $scope.pieData[1];
        $scope.graphInformation = $scope.textList[0].text;
        $scope.titre = "1996 à 1998...";
    }
    $scope.update19972005 = function () {
        $scope.data = $scope.zoomData[1];
        $scope.pieDynamicData = $scope.pieData[0];
        $scope.graphInformation = $scope.textList[1].text;
        $scope.titre = "1997 à 2005...";
    }
    $scope.update20052010 = function () {    
        $scope.data = $scope.zoomData[2];
        $scope.graphInformation = $scope.textList[2].text;
        $scope.titre = "2005 à 2010...";
    }
    $scope.update19972002 = function () {
        $scope.data = $scope.zoomData[3];
        $scope.graphInformation = $scope.textList[1].text;
        $scope.titre = "1997 à 2002...";
    }
    $scope.update20102015 = function () {    
        $scope.data = $scope.zoomData[4];
        $scope.graphInformation = $scope.textList[0].text;
        $scope.titre = "2010 à 2015...";
    }
    $scope.update20042015 = function () {
        $scope.data = $scope.zoomData[6];
        $scope.graphInformation = $scope.textList[1].text;
        $scope.titre = "2004 à 2015...";
    }
    $scope.update20092013 = function () {
        $scope.data = $scope.zoomData[8];
        $scope.graphInformation = $scope.textList[1].text;
        $scope.titre = "2009 à 2013...";
    }
    $scope.reset = function () {
        $scope.data = $scope.fix;
        $scope.graphInformation = $scope.textList[2].text;
        $scope.titre = "1996 à maintenant...";
    };
  
    /*DYNAMIC TEXT*/
    $scope.textList = [
        {id: 1, text: "This is a test!"},
        {id: 2, text: "Hope you like it :)"},
        {id: 3, text: "thank you for trying me ^^"},
        {id: 4, text: "'<h1>'Hello'</h1>'"}
    ];
    //$scope.graphInformation = "Some random Text";
        
    $scope.pieOptions = {
        chart: {
            type: 'pieChart',
            height: 300,
            width: 300,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            // duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };
    
    $scope.pourcentage = 0.05;
    
    $http.get('hyblabData/proportions_aides_disciplines.json').success (function(data) {
        $scope.fixPieData = data;
        $scope.pieList = [];
        $scope.pieData = [];
        
        var reducePieList = [];
        var reducePieData = [];
        var temp = 0;
        for (var i = 0; i < data.length; i++) {
            $scope.pieList.push(data[i].name);
            $scope.pieData.push(data[i].value);
            reducePieList.push(data[i].name);
            reducePieData.push(data[i].value);
            if (data[i].value < $scope.pourcentage) {
                reducePieList.pop();
                reducePieData.pop();
                temp += data[i].value;
            }
        }
        reducePieData.push(temp);
        reducePieList.push("Autres");
        $scope.introPieListReduce = reducePieList;
        $scope.introPieDataReduce = reducePieData;
        $scope.introPieList = $scope.pieList;
        $scope.introPieData = $scope.pieData;        
    });
    
    $scope.incr = function() {
        $scope.pourcentage += 0.01;
        updatePie();
    }
    
    $scope.decr = function() {
        $scope.pourcentage -= 0.01;
        updatePie();
    }
    
    function updatePie() {
        var reducePieList = [];
        var reducePieData = [];
        var autres = 0;
        for (var i =0; i < $scope.pieList.length; i++) {
                reducePieList.push($scope.pieList[i]);
                reducePieData.push($scope.pieData[i]);
                if ($scope.pieData[i] < $scope.pourcentage) {
                    reducePieData.pop();
                    reducePieList.pop();
                    autres += $scope.pieData[i];
                }
        }
        reducePieList.push("Autres");
        reducePieData.push(autres);
        $scope.introPieListReduce = reducePieList;
        $scope.introPieDataReduce = reducePieData;
    }
    
    $scope.introPieChartOptions = {        
        animationSteps : 25,
        animateRotate : true,
        animateScale : true,
        percentageInnerCutout : 1,
        animationEasing : "easeInOutQuart"
    }
    
    $scope.titre = "1997 à maintenant...";
    
    
    
}]);

/*Page one controller*/

app.controller('PageOneCtrl', function ($scope) {
    
});
/*Page two controller*/

app.controller('PageTwoCtrl', function ($scope) {
  
    
});