"use strict";

window.addEventListener('load',function () {

    var svg = d3.select("#carte").select("svg");
    
    var map = d3.select("#map_france");
    var regions = map.selectAll("path")
                    .attr('fill', "#000000");

    regions.on('mouseover', function(d) {
                        regions.attr("fill", "#000000");
                        $(this).attr("fill", "#252525");
                    });
    
    regions.on('click', function(d) {
                        regions.attr("fill", "#000000");
                        $(this).attr("fill", "#ffffff");
                    });
    
});