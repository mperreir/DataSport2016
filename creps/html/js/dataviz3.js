"use strict";

$(function () {
    $.getJSON("data/hs.json", function(data){
        displayBarChart(data, "#dataviz3")
    });
});

function displayBarChart(data, div){
    var width  =$( window ).width()*0.90;
    var height = $( window ).height()*2/6;
    //var data1 = [{"club": "Hawks Angers Roller","nb": 8},{"club": "La Vendéenne","nb": 6},{"club": "NAHR","nb": 4}]
    
    var chart1 = d3.select(div).append("svg")
        .attr("width", width/3)
        .attr("height", height);
            
    var chart2 = d3.select(div).append("svg")
        .attr("width", width/3)
        .attr("height", height);
        
    var chart3 = d3.select(div).append("svg")
        .attr("width", width/3)
        .attr("height", height);
            
    var data1 = data[Object.keys(data)[0]];
    var data2 = data[Object.keys(data)[1]];
    var data3 = data[Object.keys(data)[2]];
    
    displayBar(chart1, data1, width, height);
    displayNum(chart1, data1, width, height);
    displayClub(chart1, data1, width, height);
        
    displayBar(chart2, data2, width, height);
    displayNum(chart2, data2, width, height);
    displayClub(chart2, data2, width, height);
        
    displayBar(chart3, data3, width, height);
    displayNum(chart3, data3, width, height);
    displayClub(chart3, data3, width, height);
}

function displayBar(svg, data, width, height){
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
                return i * (width * 0.025 + width * 0.015) + width * 0.1;
            })
        .attr("y", function(d) {
                return height - (d.nb * height/10);
            })
        .attr("width", width * 0.025)
        .attr("height", function(d) {
                return (d.nb * height/10);
            })
        .attr("fill", "#00d68c");
        
}

function displayNum(svg, data, width, height){
    svg.selectAll("text")
        .data(data)
        .enter()    
        .append("text")
        .attr("dy", ".1em")
        .attr("x", function(d, i) {
                return i * (width * 0.025 + width * 0.015) + width*0.0125 + width * 0.1;
            })
        .attr("y", function(d) {
                return height - (d.nb * height/10)/2 + height*0.01;
            })
        .style("text-anchor", "middle")
        .attr("fill", "white")
        .text(function(d) { return d.nb });
}

function displayClub(svg, data, width, height){
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
        .text(function(d) { return d.club });
}