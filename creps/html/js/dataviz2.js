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
    //displayHisto(event.point.sports, "#bubble");
    var begin = $(".fig")[0].firstChild.firstChild.innerHTML;
    $("#infoDep").empty();
    $("#infoDep").append("<h2 class='LTitre'>" + event.point.name + "</h2>");
    $("#infoDep").append("<div class='fig'><svg></svg> <p>Sportifs de Haut Niveau</p></div>");
    displayPodium(event.point.podium);
    transitionNum(begin, event.point.nbSportifs, ".fig", "black", $( window ).height()*10/100);
}

function displayRegInfo(data){
    bubbleChart(data.sports, '#bubble');
    //displayHisto(data.sports, "#bubble");
    $("#infoDep").append("<div class='bloc1'></div>");
    $("#infoDep").append("<h2 class='LTitre'>Pays de Loire</h2>");
    $("#infoDep").append("<div class='fig'><svg></svg> <p>Sportifs de Haut Niveau</p></div>");
    displayPodium(data.podium);
    displayPieChart(data.podium[0], "pieChart");
    transitionNum(0, data.nbSportifs,'.fig', "black", $( window ).height()*10/100);
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

function transitionNum(begin, target, selector, color, size){
    var start_val = begin;
    var duration = 700;
    var end_val = [target];
    var width = 2* size + size/2;
    var height = size;
    var svg = d3.select(selector).select('svg')
        .attr("width", width)
        .attr("height", height);

    svg.selectAll(".txt")
        .data(end_val)
        .enter()
        .append("text")
        .text(start_val)
        .style("font-size", size+"px")
        //.style("font-weight", "bold")
        .style("text-anchor", "middle")
        .attr("class", "fig")
        .attr("fill",color)
        .attr("x", width/2)
        .attr("y", size - size/10)
        .transition()
        .duration(duration)
        .tween("text", function(d) {
            var i = d3.interpolate(this.textContent, d),
                prec = (d + "").split("."),
                round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
                width = d.r;
            return function(t) {
                this.textContent = Math.round(i(t) * round) / round;
            };
        });
}

function displayPodium(data){
    var podium = $("#podiumMap");
    podium.empty();
    podium.append("<div id='podiumMap1'></div>");
    $('#podiumMap1').css('background-image', 'url(img/' + data[0].path + '.jpg)').css('background-size', 'cover').css("background-position", "center");
    $('#podiumMap1').append("<h2 class='elmtPodiumMap1'>"+data[0].sport+"</h2><div id='fig1'><svg></svg><p>Sportifs de Haut Niveau</p></div><div id='fig2'><svg></svg><span>Hommes<img class='imgL' src='img/homme1.svg' height="+ $( window ).height()*4/100 +"></span></div><div id='fig3'><svg></svg><span>Femmes<img class='imgL' src='img/femme1.svg' height="+ $( window ).height()*4/100 +"></span></div><div id='pieChart'><svg></svg></div>");
    transitionNum(0,data[0].nb,"#fig1","white",$( window ).height()*5/100);
    transitionNum(0,data[0].m,"#fig2","white",$( window ).height()*5/100);
    transitionNum(0,data[0].f,"#fig3","white",$( window ).height()*5/100);
    if(data.length == 2){
        podium.append("<div id='podiumMap22'></div>");
        $('#podiumMap22').css('background-image', 'url(img/' + data[1].path + '.jpg)').css('background-size', 'cover').css("background-position", "center");
        $('#podiumMap22').append("<h2 class='elmtPodiumMap22'>"+data[1].sport+"</h2><div id='fig4'><svg></svg><p>Sportifs de Haut Niveau</p></div><div id='fig5'><img src='img/homme1.svg' height="+ $( window ).height()*5/100 +"><svg></svg></div><div id='fig6'><img src='img/femme1.svg' height="+ $( window ).height()*5/100 +"><svg></svg></div>");
        transitionNum(0,data[1].nb,"#fig4","white",$( window ).height()*5/100);
        transitionNum(0,data[1].m,"#fig5","white",$( window ).height()*5/100);
        transitionNum(0,data[1].f,"#fig6","white",$( window ).height()*5/100);
    }
    else if(data.length == 3){
        podium.append("<div id='podiumMap2'></div>");
        podium.append("<div id='podiumMap3'></div>");
        $('#podiumMap2').css('background-image', 'url(img/' + data[1].path + '.jpg)').css('background-size', 'cover').css("background-position", "center");
        $('#podiumMap2').append("<h2 class='elmtPodiumMap2'>"+data[1].sport+"</h2><div id='fig4'><svg></svg><p>Sportifs de Haut Niveau</p></div><div id='fig5'><img src='img/homme1.svg' height="+ $( window ).height()*5/100 +"><svg></svg></div><div id='fig6'><img src='img/femme1.svg' height="+ $( window ).height()*5/100 +"><svg></svg></div>");
        transitionNum(0,data[1].nb,"#fig4","white",$( window ).height()*5/100);
        transitionNum(0,data[1].m,"#fig5","white",$( window ).height()*5/100);
        transitionNum(0,data[1].f,"#fig6","white",$( window ).height()*5/100);
        $('#podiumMap3').css('background-image', 'url(img/' + data[2].path + '.jpg)').css('background-size', 'cover').css("background-position", "center");
        $('#podiumMap3').css('background-image', 'url(img/' + data[2].path + '.jpg)');
        $('#podiumMap3').append("<h2 class='elmtPodiumMap3'>"+data[2].sport+"</h2><div id='fig7'><svg></svg><p>Sportifs de Haut Niveau</p></div><div id='fig8'><img src='img/homme1.svg' height="+ $( window ).height()*5/100 +"><svg></svg></div><div id='fig9'><img src='img/femme1.svg' height="+ $( window ).height()*5/100 +"><svg></svg></div>");
        transitionNum(0,data[1].nb,"#fig7","white",$( window ).height()*5/100);
        transitionNum(0,data[1].m,"#fig8","white",$( window ).height()*5/100);
        transitionNum(0,data[1].f,"#fig9","white",$( window ).height()*5/100);
    }
}

function displayHisto(data, div){
    var height = $( window ).height()/3;
    var width = $( window ).width()/4;
    $(div).empty();
    var chart = d3.select(div).append("svg")
        .attr("width", width)
        .attr("height", height);
    
    displayBars(chart, data, width, height);
    //displayNumSportifs(chart, data, width, height);
    //displaySport(chart, data, width, height);
}

function displayBars(svg, data, width, height){
    var barPadding = 1;
    var w = (width - width * 0.1)/ data.length - barPadding;
    svg.selectAll("rect")
        .data(data.sort(function(a,b) { return +b.nb - +a.nb; }))
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
                return i * w + width * 0.2;
            })
        .attr("y", function(d) {
                return height - (d.nb * height/30);
            })
        .attr("width", w)
        .attr("height", function(d) {
                return (d.nb * height/10);
            })
        .attr("fill", "#00d68c");
        
}

function displayNumSportifs(svg, data, width, height){
    svg.selectAll("text")
        .data(data)
        .enter()    
        .append("text")
        .attr("dy", ".1em")
        .attr("x", function(d, i) {
                return i * (width * 0.025 + width * 0.015);
            })
        .attr("y", function(d) {
                return height - (d.nb * height/10)/2 + height*0.01;
            })
        .style("text-anchor", "middle")
        .attr("fill", "white")
        .text(function(d) { return d.nb });
}

function displaySport(svg, data, width, height){
    svg.selectAll(".text")
        .data(data)
        .enter()    
        .append("text")
        .attr("dy", ".1em")
        .attr("x", function(d, i) {
                return i * (width * 0.025 + width * 0.015) + width * 0.1;
            })
        .attr("y", function(d) {
                return height - (d.nb * height/10) - height*0.03;
            })
        .style("text-anchor", "start")
        .attr("fill", "#3d3d3d")
        .text(function(d) { return d.sport });
}

function displayPieChart(data, div){
    var width = 960;
    var height = 500;
    var radius = Math.min(width, height) / 2;
    
    var dat = [{"nb":data.masculin},{"nb":data.feminin}];
    
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    
    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.nb; });
    
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    
    var g = svg.selectAll(".arc")
        .data(pie(dat))
        .enter().append("g")
        .attr("class", "arc");
    
    g.append("path")
      .attr("d", arc)
      .style("fill", "white");
    
    /*g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.age; });*/
}