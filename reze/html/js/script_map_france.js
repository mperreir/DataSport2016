"use strict";

var width = 700,
    height = 500;
//Define map projection
var projection = d3.geo.mercator()
                     .center([0.816, 46.28]) // On centre la carte sur la France
                      .scale(1700)
                      .translate([width / 2, height / 2]);
//Define path generator
var path = d3.geo.path()
                 .projection(projection);
var svg = d3.select("#map").append("svg")
    .attr("id", "carte_france_s6")
    .attr("width", width)
    .attr("height", height);
d3.json("Ressources/data/regions.topojson", function(error, topology) {
  if (error) {
    console.log(error);
    throw error;
  }
  var pathes = svg.selectAll("path")
      .data(topojson.feature(topology, topology.objects.region).features)
    .enter().append("path")
      .attr("d", path)
      .attr("fill", function(d) { return d.properties.nom=="Pays de la Loire" ? 'blue': '#ccc' })
      .on('click', regionClickHandler);
  var coordinates = projection([-1.5922779,47.1733296]);
  svg.append('svg:circle')
    .attr('cx', coordinates[0])
    .attr('cy', coordinates[1])
    .attr('fill','red')
    .attr('r', 7);
});

function regionClickHandler(d){
    histogram(d.properties.nom);
}

function histogram(region){
    console.log(region);
    d3.select("#region_name_green").text(region);

    $('svg.chart').html('');
    d3.json("../Ressources/data/regions.json", function(error, regions) {
      if (error) {
        throw error;
      }
      var data = regions.filter(function(r){
        return r.region == region;
      })

      data = [24.3, data[0].part_population, 42.6, data[0].part_femme];
      var width = 150,
        barHeight = 10;

        var x = d3.scale.linear()
            .domain([0, 100])
            .range([0, width]);

        var chart = d3.select(".chart")
            .attr("width", width * 3)
            .attr("height", barHeight * 9);

        var bar = chart.selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d, i) {
                return i<2 ? "translate(200," + i * 2 * barHeight + ")":
                "translate(200," + (1 + i * 2) * barHeight + ")";
            });

        bar.append("rect")
            .attr('fill','black')
            .attr("height", barHeight - 1)
            .attr("width", width);

        bar.append("rect")
            .attr("width", 0)
            .attr('fill', function(d, i) { return i%2==0 ? 'red' : 'green' })
            .attr("height", barHeight - 1)
            .transition()
            .duration(1000)
            .ease("quad")
            .attr("width", x);

        bar.append("text")
            .attr("x", function(d) { return width + 5 ; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .attr("fill", function(d, i) { return i%2==0 ? 'red' : 'green' })
            .text(function(d) { return d+'%'; });

        bar.append("text")
            .attr("y", barHeight / 2)
            .attr("dx", "-1.3em")
            .attr("dy", ".35em")
            .attr('class','histogram-legend')
            .attr("text-anchor", "end")
            .attr("fill", "white")
            .text(function(d,i) {
                if(i == 0) return 'Pourcentage de licenciés';
                else if(i == 1) return 'parmi la population globale';
                else if(i == 2) return 'Pourcentage de femmes';
                else if(i == 3) return 'licenciées';
             });

        chart.append("line")
            .attr("x1", "190")
            .attr("y1", "0")
            .attr("x2", "190")
            .attr("y2", "30")
            .attr("stroke", "white")
            .attr("stroke-width", "2");

        chart.append("line")
            .attr("x1", "192")
            .attr("y1", "50")
            .attr("x2", "192")
            .attr("y2", "80")
            .attr("stroke", "white")
            .attr("stroke-width", "2");

        });
}
