var appHyblab = angular.module('hyblabApp');

/*Intro page Controller*/

appHyblab.controller('IntroCtrl', function ($scope) {
      
   
});

/*Whole page controller*/

appHyblab.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $http.get('hyblabData/data.json').success (function(data) {
        $scope.data = data;
        $scope.fix = data;
    });
    $http.get('hyblabData/dataCreation.json').success (function (data) {
        $scope.dataMini = data; 
    });
    $http.get('hyblabData/zoomData.json').success (function(data) {
        $scope.zoomData = data;
    });
    $http.get('hyblabData/pieData.json').success (function(data) {
        $scope.pieData = data;
        $scope.pieDynamicData = data[0];
    });
    $http.get('hyblabData/aides_accordees_par_discipline.json').success (function(data) {
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
    $http.get('hyblabData/aides_accordees_par_disciplaine2.json').success (function(data) {
        $scope.fixPieData2 = data;
        $scope.pieList2 = [];
        $scope.pieData2 = [];
        
        var reducePieList2 = [];
        var reducePieData2 = [];
        var temp2 = 0;
        for (var i = 0; i < data.length; i++) {
            $scope.pieList2.push(data[i].name);
            $scope.pieData2.push(data[i].value);
            reducePieList2.push(data[i].name);
            reducePieData2.push(data[i].value);
            if (data[i].value < $scope.pourcentage2) {
                reducePieList2.pop();
                reducePieData2.pop();
                temp2 += data[i].value;
            }
        }
        reducePieData2.push(temp2);
        reducePieList2.push("Autres");
        $scope.introPieListReduce2 = reducePieList2;
        $scope.introPieDataReduce2 = reducePieData2;
        $scope.introPieList2 = $scope.pieList2;
        $scope.introPieData2 = $scope.pieData2;
    });
    
    $http.get('hyblabData/dataBar.json').success(function (data) {
        
        $scope.barData = data;
        $scope.zoomBarFixData = data;
    });
    
    $http.get('hyblabData/zoomDataBar.json').success(function (data) {
       $scope.zoomBarData = data; 
       
    });
    
    $http.get('hyblabData/dataInfo.json').success(function (data) {
       $scope.dataInfo = data;
    });
    $scope.courbeDescription = "La stratégie régionale en matière d’emploi fera l’objet d’un examen spécifique au sein de la commission territoriale. Un renforcement de ce moyen d’intervention devra être mis en œuvre sur la période 2013-2016 dans chaque région."

    $scope.courbeDescriptionTitre = "Qu\'est-ce que c\'est?"
    $scope.courbeDescriptionAge = "Tous les âges";
    $scope.courbeDescriptionNature = "Rémunération";
    $scope.courbeDescriptionAutre = "";

    $scope.options = {
            chart: {
              type: 'multiChart',
              height: 300,
              margin : {
                  top: 30,
                  right: 60,
                  bottom: 50,
                  left: 70
              },
              x: function(d){ return d.x; },
              y: function(d){ return d.y; },
              transitionDuration: 100,
              color: ['rgba(0, 175, 155, 0.8)','rgba(182, 174, 195, 0.8)'],
              xAxis: {

              },
              yAxis1: {
                  showMaxMin: false,
                  tickFormat: function(d){
                      return d3.format('.02f')(d);
                  },
                  axisLabelDistance: 300,
                  css: {
                opacity:"0.4",
                color:"white",
            }
              },
              yAxis2: {

                  
              },
              useInteractiveGuideline: true,
              tooltip: true,
              interactiveLayer: {
                  tooltip: {
                    contentGenerator: function (e) {
                      var series = e.series[0];
                      if (series.value === null) return;
                      var temp = "";
                      if (series.originalKey == "chomage"){
                          temp = " POURCENT DE CHÔMEUR ";
                      }  else {
                          temp = " EMPLOI CRÉES ";
                      }
                      return "<div class='toolTip'><h2>"+(series.value?series.value.toFixed(2):0)+"</h2><p> "+temp+"</p><h1>en "+e.value+"</h1></div>";
                    } 
                  }
                },
                callback: function(){
                  d3.selectAll('.nvd3.nv-legend g').style('fill', "RGBA(55, 196, 180, 1)")
            },
            css: {
                opacity:"0.4",
            }
        }
        };
    $scope.optionsMini = {
            chart: {
              type: 'multiChart',
              height: 340,
              margin : {
                  top: 30,
                  right: 60,
                  bottom: 50,
                  left: 70
              },
              x: function(d){ return d.x; },
              y: function(d){ return d.y; },
              transitionDuration: 100,
              color: ['rgba(0, 175, 155, 0.2)','rgba(182, 174, 195, 0.2)'],
              xAxis: {

              },
              yAxis1: {
                  showMaxMin: false,
                  tickFormat: function(d){
                      return d3.format('.02f')(d);
                  },
                  axisLabelDistance: 300
              },
              yAxis2: {
                  
              },
              useInteractiveGuideline: true,
              tooltip: true,
              interactiveLayer: {
                  tooltip: {
                    contentGenerator: function (e) {
                      var series = e.series[0];
                      if (series.value === null) return;
                      var temp = "";
                      if (series.originalKey == "chomage"){
                          temp = " POURCENT DE CHÔMEUR ";
                      }  else {
                          temp = " EMPLOI CRÉES ";
                      }
                      return "<div class='toolTip'><h2>"+(series.value?series.value.toFixed(2):0)+"</h2><p> "+temp+"</p><h1>en "+e.value+"</h1></div>";
                    } 
                  }
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: false,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: ''
                },
                yAxis: {
                    axisLabel: '',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                showXAxis: false,
                showYAxis: false,
                showLegend: false,
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: false,
                text: 'Title for Line Chart'
            },
            subtitle: {
                enable: false,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: false,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };
    
    var listCreation = [23, 11, 8, 5, 7, 3, 10, 7, 7, 3, 11, 9, 14, 10, 10, 9, 14, 19, 28];
    $scope.emploisCreer = "180"
    function emplois(start, end) {
        $scope.emploisCreer = 0;
        for (var i = start; i < end; i++) {
            $scope.emploisCreer += listCreation[i];
        }
    };
    function updateColor(debut, fin) {

        for (var i = 0; i < 19; i++) {
            d3.selectAll("rect.nv-bar")[0][i].style= "fill: rgba(99, 120, 135, 0.2)";
        }
        for (var i = debut; i < fin; i++) {
            d3.selectAll("rect.nv-bar")[0][i].style= "fill: RGBA(55, 196, 180, 1)";
        }
    }
    $scope.barAnnee = "1997- 2015";
    $scope.update19961998 = function () {    
        $scope.data = $scope.zoomData[0];
        $scope.pieDynamicData = $scope.pieData[1];
        //$scope.barData = $scope.zoomBarData[0];
        $scope.titre = "1997 à 1998";
        $scope.barAnnee = "1997 - 1998";
        emplois(0,2);
        updateColor(0, 2);
    }
    $scope.update19972005 = function () {
        $scope.data = $scope.zoomData[1];
        $scope.pieDynamicData = $scope.pieData[0];
        //$scope.barData = $scope.zoomBarData[1];
        $scope.titre = "1997 à 2005";
        $scope.barAnnee = "1997 - 2005";
        emplois(0,9);
        updateColor(0, 9);
        $scope.courbeDescription = $scope.dataInfo[1].description;

        $scope.courbeDescriptionTitre = $scope.dataInfo[1].nom;

    }
    $scope.update20052010 = function () {    
        $scope.data = $scope.zoomData[2];
        //$scope.barData = $scope.zoomBarData[2];
        $scope.titre = "2005 à 2010";
        $scope.barAnnee = "2005 - 2010";
        emplois(8, 14);
        updateColor(8, 14);
        $scope.courbeDescription = $scope.dataInfo[4].description;

        $scope.courbeDescriptionTitre = $scope.dataInfo[4].nom;

    }
    $scope.update19972002 = function () {
        $scope.data = $scope.zoomData[3];
        //$scope.barData = $scope.zoomBarData[3];
        $scope.titre = "1997 à 2002";
        $scope.barAnnee = "1997 - 2002";
        emplois(0, 6);
        updateColor(0, 6);
        $scope.courbeDescription = $scope.dataInfo[3].description;

        $scope.courbeDescriptionTitre = $scope.dataInfo[3].nom;

    }
    $scope.update20102015 = function () {    
        $scope.data = $scope.zoomData[4];
        //$scope.barData = $scope.zoomBarData[4];
        $scope.titre = "2010 à 2015";
        $scope.barAnnee = "2010 - 2015";
        emplois(13, 19);
        updateColor(13, 19);
        $scope.courbeDescription = $scope.dataInfo[8].description;

        $scope.courbeDescriptionTitre = $scope.dataInfo[8].nom;

    }
    $scope.update20042015 = function () {
        $scope.data = $scope.zoomData[6];
        //$scope.barData = $scope.zoomBarData[6];
        $scope.titre = "2004 à 2015";
        $scope.barAnnee = "2004 - 2015";
        emplois(7, 19);
        updateColor(7, 19);
        $scope.courbeDescription = $scope.dataInfo[11].description;
        $scope.courbeDescriptionTitre = $scope.dataInfo[11].nom;
        $scope.courbeDescriptionAge = $scope.dataInfo[11].age;
        $scope.courbeDescriptionNature = $scope.dataInfo[11].nature;
        $scope.courbeDescriptionAutre = $scope.dataInfo[11].autre;

    }
    $scope.update20092013 = function () {
        $scope.data = $scope.zoomData[8];
        //$scope.barData = $scope.zoomBarData[7];
        $scope.titre = "2009 à 2013";
        $scope.barAnnee = "2009 - 2013";
        emplois(12, 17);
        updateColor(12, 17);
        $scope.courbeDescription = $scope.dataInfo[13].description;
        $scope.courbeDescriptionTitre = $scope.dataInfo[13].nom;
        $scope.courbeDescriptionAge = $scope.dataInfo[13].age;
        $scope.courbeDescriptionNature = $scope.dataInfo[13].nature;
        $scope.courbeDescriptionAutre = $scope.dataInfo[13].autre;

    }
    $scope.update19922005 = function () {
        $scope.data = $scope.zoomData[12];
        //$scope.barData = $scope.zoomBarData[7];
        $scope.titre = "1992 à 2005...";
        $scope.barAnnee = "1992 - 2005";
        emplois(0, 9);
        updateColor(0, 9);
    }
    $scope.update20122015 = function () {
        $scope.data = $scope.zoomData[10];
        //$scope.barData = $scope.zoomBarData[7];
        $scope.titre = "2012 à 2015...";
        $scope.barAnnee = "2012 - 2015";
        emplois(15, 19);
        updateColor(15, 19);
        $scope.courbeDescription = $scope.dataInfo[9].description;
        $scope.courbeDescriptionTitre = $scope.dataInfo[9].nom;
        $scope.courbeDescriptionAge = $scope.dataInfo[9].age;
        $scope.courbeDescriptionNature = $scope.dataInfo[9].nature;
        $scope.courbeDescriptionAutre = $scope.dataInfo[9].autre;

    }
    $scope.update20132015g = function () {
        $scope.data = $scope.zoomData[11];
        //$scope.barData = $scope.zoomBarData[7];
        $scope.titre = "2013 à 2015...";
        $scope.barAnnee = "2013 - 2015";
        emplois(17, 19);
        updateColor(17, 19);
        $scope.courbeDescription = $scope.dataInfo[10].description;
        $scope.courbeDescriptionTitre = $scope.dataInfo[10].nom;
        $scope.courbeDescriptionAge = $scope.dataInfo[10].age;
        $scope.courbeDescriptionNature = $scope.dataInfo[10].nature;
        $scope.courbeDescriptionAutre = $scope.dataInfo[10].autre;

    }
    $scope.update20132015c = function () {
        $scope.data = $scope.zoomData[11];
        //$scope.barData = $scope.zoomBarData[7];
        $scope.titre = "2013 à 2015...";
        $scope.barAnnee = "2013 - 2015";
        emplois(17, 19);
        updateColor(17, 19);
        $scope.courbeDescription = $scope.dataInfo[14].description;
        $scope.courbeDescriptionTitre = $scope.dataInfo[14].nom;
        $scope.courbeDescriptionAge = $scope.dataInfo[14].age;
        $scope.courbeDescriptionNature = $scope.dataInfo[14].nature;
        $scope.courbeDescriptionAutre = $scope.dataInfo[14].autre;

    }
    $scope.update19962009 = function () {
        $scope.data = $scope.zoomData[13];
        //$scope.barData = $scope.zoomBarData[7];
        $scope.titre = "1996 à 2009...";
        $scope.barAnnee = "1996 - 2009";
        emplois(0, 13);
        updateColor(0, 13);
        $scope.courbeDescription = $scope.dataInfo[12].description;

        $scope.courbeDescriptionTitre = $scope.dataInfo[12].nom;

    }
    $scope.reset = function () {
        $scope.data = $scope.fix;
        $scope.barData = $scope.zoomBarFixData;
        $scope.titre = "1997 à Aujourd'hui";
        $scope.barAnnee = "1997 - 2015";
        emplois(0, 18);
        for (var i = 0; i < 19; i++) {
            d3.selectAll("rect.nv-bar")[0][i].style= "fill: rgba(99, 120, 135, 0.3)"
        }
        $scope.courbeDescription = "La stratégie régionale en matière d’emploi fera l’objet d’un examen spécifique au sein de la commission territoriale. Un renforcement de ce moyen d’intervention devra être mis en œuvre sur la période 2013-2016 dans chaque région."
        $scope.courbeDescriptionTitre = "Qu\'est-ce que c\'est?"
    };
          
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
            },
        tooltipFillColor: "rgba(100,100,0,0.8)"
        }
    };
    
    $scope.pourcentage = 0.08;
    $scope.pieBoundary = false;
    $scope.pieMessage = "";
    
    $scope.pourcentage2 = 2.05;
    $scope.pieBoundary2 = false;
    $scope.pieMessage2 = "";
    
    function pieBounds(aBool) {
        if (aBool == true) {
            $scope.pieMessage = " Limite atteint...";
        } else {
            $scope.pieMessage = "";
        }
    }
    
    function pieBounds2(aBool) {
        if (aBool == true) {
            $scope.pieMessage2 = " Limite atteint...";
        } else {
            $scope.pieMessage2 = "";
        }
    }
    
    
    $scope.incr = function() {
        if ($scope.pourcentage < 0.07) {
            $scope.pourcentage += 0.01;
            updatePie();
        } else {
            $scope.pieBoundary = true;
            pieBounds($scope.pieBoudary);
            $scope.pieBoundary = false;
        }
    }
    
    $scope.decr = function() {
        if ($scope.pourcentage > 0.03) {
            $scope.pourcentage -= 0.01;
            updatePie();
        } else {
            $scope.pieBoundary = true;
            pieBounds($scope.pieBoundary);
            $scope.pieMessage = false;
        }
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
    
    $scope.incr2 = function() {
        if ($scope.pourcentage2 < 100) {
            $scope.pourcentage2 += 1;
            updatePie2();
        } else {
            $scope.pieBoundary2 = true;
            pieBounds2($scope.pieBoudary2);
            $scope.pieBoundary2 = false;
        }
    }
    
    $scope.decr2 = function() {
        if ($scope.pourcentage2 > 0) {
            $scope.pourcentage2 -= 1;
            updatePie2();
        } else {
            $scope.pieBoundary2 = true;
            pieBounds2($scope.pieBoundary2);
            $scope.pieMessage2 = false;
        }
    }
    
    function updatePie2() {
       
            var reducePieList2 = [];
            var reducePieData2 = [];
            var autres = 0;
            for (var i =0; i < $scope.pieList2.length; i++) {
                    reducePieList2.push($scope.pieList2[i]);
                    reducePieData2.push($scope.pieData2[i]);
                    if ($scope.pieData2[i] < $scope.pourcentage2) {
                        reducePieData2.pop();
                        reducePieList2.pop();
                        autres += $scope.pieData2[i];
                    }
            }
            reducePieList2.push("Autres");
            reducePieData2.push(autres);
            $scope.introPieListReduce2 = reducePieList2;
            $scope.introPieDataReduce2 = reducePieData2;   
    
    }
    
    $scope.introPieChartOptions = {        
        animationSteps : 25,
        animateRotate : true,
        animateScale : true,
        percentageInnerCutout : 1,
        animationEasing : "easeInOutQuart"
    }
    
    $scope.titre = "1997 à Aujourd'hui";
    
    $scope.optionBarChart = {
        chart: {
            type: 'multiBarChart',
            height: 150,
            width: 300,
            margin : {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
            },
            clipEdge: false,
            duration: 40,
            stacked: false,
            color: ['RGBA(55, 196, 180, 1)'],
            xAxis: {
                axisLabel: '',
                showMaxMin: false,
                tickFormat: function(d){
                    return d3.format('.0f')(d);
                }
            },
            yAxis: {
                axisLabel: '',
                axisLabelDistance: -20,
                tickFormat: function(d){
                    return d3.format('.0f')(d);
                }

            },
            showXAxis: false,
            showYAxis: false,
            dispatch: {
              /*tooltipShow: function(e){ console.log('! tooltip SHOW !')},
              tooltipHide: function(e){console.log('! tooltip HIDE !')},
              beforeUpdate: function(e){ console.log('! before UPDATE !')}*/
            },
            multibar: {
              dispatch: {
                //chartClick: function(e) {console.log("! chart Click !")},
                elementClick: function(e) {
                    //console.log(e);
                    
                    
                },
                //elementDblClick: function(e) {console.log("! element Double Click !")},

                // elementMouseout: function(e) {
                //     d3.selectAll("rect.nv-bar")[0][e.index].style= "fill: RGBA(230, 230, 230, 1)";
                // },
                // elementMouseover: function(e) { 
                //     //console.log(e.index);
                //     d3.selectAll("rect.nv-bar")[0][e.index].style= "fill: RGBA(55, 196, 180, 1)";
                // }



              }
            },
            tooltip: {
                enable: false,
                contentGenerator: function (e) {
                  var series = e.series[0];
                  if (series.value === null) return;
                  var temp = "";
                  if (series.originalKey == "chomage"){
                      temp = " POURCENT DE CHÔMEUR ";
                  }  else {
                      temp = " EMPLOI CRÉES ";
                  }
                  return "<div class='toolTip'><h2>"+(series.value?series.value.toFixed(2):0)+"</h2><p> "+temp+"</p><h1>en "+Math.round(e.value)+"</h1></div>";
                } 
          },
            interactive: false,
            showLegend: false,
            showControls: false,
            scaleShowGridLines: false,
            callback: function(chart) {
                //console.log(d3.select("#nvd3-svg svg").selectAll("g"));
                //console.log(chart);
                /*d3.selectAll("rect.nv-bar")
                  .style("fill", function(d, i){
                        return d.y > 50 ? "red":"blue";
                    });
                console.log(d3.selectAll("rect.nv-bar"));*/
                //d3.selectAll("rect.nv-bar")[0][18].style= "fill: red"
            }
        
        }
    }
    

}]);

/*Page one controller*/

appHyblab.controller('PageOneCtrl', function ($scope) {
    
});
/*Page two controller*/

appHyblab.controller('PageTwoCtrl', function ($scope) {
  
    
});

appHyblab.controller('PageThreeCtrl', function ($scope) {
    $scope.slides = [
            {'src': 'css/images/photo2.jpg'},
            {'src': 'css/images/photo3.jpg'},
            {'src': 'css/images/photo4.jpg'},
            {'src': 'css/images/iut.jpg'}/*,
            {'src': 'images/photo5.jpg', caption: 'Lorem ipsum dolor sit amet,  Enim, maxime.'},
            {'src': 'images/photo6.jpg', caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.'}*/
        ];

    $scope.slideOptions = {
            sourceProp: 'src',
            visible: 5,
            perspective: 60,
            startSlide: 0,
            border: 5,
            dir: 'ltr',
            width: 360,
            height: 270,
            space: 220
        };


        // ANY HTML
        //===================================
    $scope.slides2 = [
            /*{'bg': '#2a6496', caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.'},
            {'bg': '#000000', caption: 'Lorem ipsum dolor sit amet '},
            {'bg': '#ffcc41', caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '},
            {'bg': '#445fac', caption: 'Lorem ipsum dolor sit amet,  Enim, maxime.'},
            {'bg': '#442BF3', caption: 'Lorem ipsum dolor sit amet,  Maxime.'}*/
        ];

    $scope.slideOptions2 = {
            visible: 3,
            perspective: 35,
            startSlide: 0,
            border: 0,
            dir: 'ltr',
            width: 360,
            height: 270,
            space: 220,
            controls: true
        };


        $scope.selectedClick = selectedClick;
        $scope.slideChanged = slideChanged;
        $scope.beforeChange = beforeChange;
        $scope.lastSlide = lastSlide;


        function lastSlide(index) {
            console.log('Last Slide Selected callback triggered. \n == Slide index is: ' + index + ' ==');
        }

        function beforeChange(index) {
            console.log('Before Slide Change callback triggered. \n == Slide index is: ' + index + ' ==');
        }

        function selectedClick(index) {
            console.log('Selected Slide Clicked callback triggered. \n == Slide index is: ' + index + ' ==');
        }

        function slideChanged(index) {
            console.log('Slide Changed callback triggered. \n == Slide index is: ' + index + ' ==');
            if (index == 0) {
                $scope.photos = [
                {'src': 'css/images/pauwel.jpg',
                 'nom': 'Pauwel Almeida'},
                {'src': 'css/images/jonathan.jpg',
                 'nom': 'Jonathan Yue Chun'},
                {'src': 'css/images/guest.jpg',
                 'nom': 'Qian Yin'}
            ];
            } else if (index == 1) {
                $scope.photos = [
                    {'src': 'css/images/clement.jpg',
                     'nom': 'Clément Aupiais'},
                    {'src': 'css/images/maxime.jpg',
                     'nom': 'Maxime Bénéteau'}
                ];
            } else if (index == 3) {
                $scope.photos = [
                    {'src': 'css/images/tiphainesaintfelix.jpg',
                     'nom': 'Tiphaine Saint-Félix'}
                ];
            } else if (index == 2) {
                $scope.photos = [
                    {'src': 'css/images/salomeraffi.jpg',
                     'nom': 'Salomé Raffi'},
                    {'src': 'css/images/amandinevahe.jpg',
                     'nom': 'Amandine Vahé'},
                    {'src': 'css/images/ophelieprioux.jpg',
                     'nom': 'Ophélie Prioux'},
                    {'src': 'css/images/emmehuet.jpg',
                     'nom': 'Emma Heulet'},
                    {'src': 'css/images/marianneetienvre.jpg',
                     'nom': 'Marianne Etienvre'}
                ];
            }
        }
            
        //POLYTECH
        $scope.photos = [
            {'src': 'css/images/pauwel.jpg',
             'nom': 'Pauwel Almeida'},
            {'src': 'css/images/jonathan.jpg',
             'nom': 'Jonathan Yue Chun'},
            {'src': 'css/images/guest.jpg',
             'nom': 'Qian Yin'}
        ];
    
});

