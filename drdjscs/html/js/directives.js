var app = angular.module('hyblabApp');

app.directive("linearChart", function($window) {
  return{
    restrict: "EA",
    template: "<svg width='850' height='200'></svg>",
    link: function(scope, elem, attrs){
        var salesDataToPlot=scope[attrs.chartData];
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.quantile()
                   .domain([0, d3.max(salesDataToPlot, function (d) {
                       return d.sales;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(salesDataToPlot.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.area()
                   .x(function (d) {
                       return xScale(d.hour);
                   })
                   .y(function (d) {
                       return yScale(d.sales);
                   })
                   .interpolate("basis");
           }
         
         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(salesDataToPlot),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           drawLineChart();
       }
  }

});

app.directive('hyblab', function ($window) {
    return {
        restrict: 'EA',
        template: "<svg width='500' height='1000'></svg>",
        link: function(scope, elem, attrs) {
        var d3 = $window.d3;
        var rawSvg=elem.find('svg');
        var svg = d3.select(rawSvg[0]);
      
        function init () {
        var dataArray = [20, 40, 52, 60];
        //Passing Json to directive
        var someVar=scope[attrs.someVar];
        console.log(JSON.stringify(scope.someVar));
            //end
        var width = 500;
        var height = 500;
        var widthScale = d3.scale.linear()
                        .domain([0,60])
                        .range([0, width]);
        
        var color = d3.scale.linear()
                    .domain([0, 60])
                    .range(['red', 'blue']);
            
        var bars = svg.selectAll("rect")
                    .data(dataArray)
                    .enter()
                        .append("rect")
                        .attr("width", function (d) {return widthScale(d);})
                        .attr("height", 50)
                        .attr("y", function (d, i) {return i*100;})
                        .attr("x", function (d, i) {return 0;})
                        .attr("fill", function(d) {return color(d);});
        }
        init();
            
        }
    }
});
