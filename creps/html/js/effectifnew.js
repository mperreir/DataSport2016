"use strict";

$(function () {
    $.getJSON("data/effectifnew.json", function(data){
        console.log("Coucou");
        displayBarChart(data.data,"#histogramme")
        console.log("Coucou");
    });
});

function displayBarChart(data, div){
    var width  =$( window ).width()*0.64;
    var height = $( window ).height()*0.59;

    var histogrammeeffectif = d3.select(div).select("svg")
        .attr("width", width)
        .attr("height", height);
        

    displayBar(histogrammeeffectif, data, width, height,"masculin");
    displayNum(histogrammeeffectif, data, width, height,"masculin");
    displayClub(histogrammeeffectif, data, width, height,"masculin");
   
}

function displayBar(svg, data, width, height,sexe){
    var barPadding = 2;
    var w = (width - width * 0.1)/data.length - barPadding;
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
                return i * (w+barPadding) + width * 0.03; //placement des barres en largeur ,, width*0.015 = espace entre barre , width*0.1 = espace avant 1ere barre
            })
        .attr("y", function(d) {
                return height - (d[sexe]*height/50) - 50; // placement des barres en hauteur
            })
        .attr("width", w) //largeur barres
        .attr("height", function(d) {
                return (d[sexe] * height/50); //hauteur barres
            })
        .attr("fill", "#00d68c");
        
}

function displayNum(svg, data, width, height,sexe){
    var barPadding = 2;
    var w = (width - width * 0.1)/data.length - barPadding;
    svg.selectAll("text")
        .data(data)
        .enter()    
        .append("text")
        .attr("dy", ".1em")
        .attr("x", function(d, i) {
               return i * (w+barPadding) + width * 0.03+10;
               console.log("Coucou");
            })
        .attr("y", function(d) {
                return height - (d[sexe])/2 + height*0.01 - 50;
            })
        .style("text-anchor", "middle")
        .attr("fill", "red")
        .text(function(d) { return d[sexe] });
}

function displayClub(svg, data, width, height,sexe){
    svg.selectAll(".text")
        .data(data)
        .enter()    
        .append("text")
        .attr("dy", ".1em")
        .attr("x", function(d, i) {
            console.log(d[sexe]);
            return i * (width * 0.025 + width * 0.015) + width * 0.1;
            })
        .attr("y", function(d) {
                return height - (d[sexe]) - height*0.03;
            })
        .style("text-anchor", "start")
        .attr("fill", "#3d3d3d")
        .text(function(d) { return Object.keys(d)[1] });
}