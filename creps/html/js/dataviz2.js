"use strict";

$(function () {
    $.getJSON("data/mapPDL.json", function(data){
        displayRegInfo(data.data[0]);
        displayMap(data.data);
    });
});

function displayMap(data){
    var mapPDL = $('#dataviz2M');
    mapPDL.highcharts('Map', {
        chart: {
            height: $( window ).height()*0.7,
            width: $( window ).width()*0.5
        },  
        title: {
            text : ''
        },
        exporting: {
            enabled: false,
        },
        legend: {
            enabled: false
        },
            credits: {
                enabled: false
        },
        tooltip:{
                enabled: false
        },
        series : [{
            data : data,
            mapData: Highcharts.maps['countries/fr/fr-r-all'],
            joinBy: 'hc-key',
            showInLegend: false,
            color: '#7c7c7c ',
            animation: true,
            allowPointSelect: true,
            events: {
                click: function(event){
                    displayDepInfo(event);
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            states: {
                select: {
                    color: '#00d68c',
                    borderColor: 'black',
                    dashStyle: 'shortdot'
                }
            }
        }]
    });
};

function displayDepInfo(event){
    bubbleChart(event.point.sports, '#bubble');
    //console.log($(".fig")[0].firstChild.firstChild.innerHTML);
    var begin = $(".fig")[0].firstChild.firstChild.innerHTML;
    $("#infoDep").empty();
    $("#infoDep").append("<h2>" + event.point.name + "</h2>");
    $("#infoDep").append("<figure class='fig'><svg></svg> Sportifs de Haut Niveau</figure>");
    transitionNum(begin, event.point.nbSportifs, ".fig", 1.5);
}

function displayRegInfo(data){
    bubbleChart(data.sports, '#bubble');
    $("#infoDep").append("<h2>Pays de Loire</h2>");
    $("#infoDep").append("<figure class='fig'><svg></svg> Sportifs de Haut Niveau</figure>");
    transitionNum(0, data.nbSportifs,'.fig', 1.5);
}

function bubbleChart(data, selector){
    var height = $( window ).height()/3;
    var width = $( window ).width()/4;
    var color = d3.scale.category20c();
    var format = d3.format(",d");
    
    var bubble = d3.layout.pack()
      .size([width, height])
      .padding(1.5) // padding between adjacent circles
      .sort(null)
      .value(function(d) {
          return d.nb;
      }); // new data will be loaded to bubble layout*/
    
    var svg = d3.select(selector).select('svg')
        .attr('width', width)
        .attr('height', height);
    
    var node = svg.selectAll("circle")
        .data(bubble.nodes({children: data})
        .filter(function(d) { return !d.children; }), function(d) { return d.sport; })
    
    var duration = 500;
    var delay = 0;
    
    node.transition()
        .duration(duration)
        .delay(function(d, i) {delay = i * 7; return delay;}) 
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
        .attr('r', function(d) { return d.r; })
        .style("fill", function(d) {
            return color(d.sport);
        });
    
    node.enter().append("circle")
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
        .attr('r', function(d) { return 0; })
        .attr('class', function(d) { return d.sport; })
        .transition()
        .duration(duration * 1.2)
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) {
            return color(d.sport);
        });
        
    node.exit()
		.transition()
		.duration(duration)
		.attr('transform', function(d) { 
			var dy = d.y - height/2;
			var dx = d.x - width/2;
			var theta = Math.atan2(dy,dx);
			var destX = height * (1 + Math.cos(theta) )/ 2;
			var destY = width * (1 + Math.sin(theta) )/ 2; 
			return 'translate(' + destX + ',' + destY + ')'; })
		.attr('r', function(d) { return 0; })
		.remove();
		
	node.select("text").remove();
    node.append("text")
      .attr("dy", ".1em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.sport.substring(0, d.r / 3); });
	
	node.select("title").remove();
	node.append("title")
        .text(function(d) { return d.sport + ": " + format(d.nb); });
        
    
}

function transitionNum(begin, target, selector, size){
    var start_val = begin;
    var duration = 700;
    var end_val = [target];
    var width = 4;
    var height = size + 0.7;
    var svg = d3.select(selector).select('svg')
        .attr("width", width+"em")
        .attr("height", height+"em");
        
    /*var rect =svg.append("rect")
        .attr("x", 100)
        .attr("y", 50)
        .attr("height", 100)
        .attr("width", 200);*/

    svg.selectAll(".txt")
        .data(end_val)
        .enter()
        .append("text")
        .text(start_val)
        .style("font-size", size+"em")
        .style("font-weight", "bold")
        .style("text-anchor", "start")
        .attr("class", "txt")
        .attr("x", 0)
        .attr("y", (size-0.1)+"em")
        .transition()
        .duration(duration)
        .tween("text", function(d) {
            var i = d3.interpolate(this.textContent, d),
                prec = (d + "").split("."),
                round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

            return function(t) {
                this.textContent = Math.round(i(t) * round) / round;
            };
        });
}
