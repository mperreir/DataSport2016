"use strict";

// définition de la hauteur de la div selon la hauteur de l'écran - les marges (60px en haut et en bas)
var divDataviz1 = d3.select("#dataviz1");
divDataviz1.style("height", window.innerHeight +"px");
//Ajout du titre au dessus de la dataviz1
var titre = divDataviz1.append("div").attr("id", "titreDataviz1");
titre.append("h1");

// création de la div qui contiendra les infos à droite de la dataviz
var affichageHover = divDataviz1.append("div").attr("id", "infos_licencies");
affichageHover.append("p").attr("class", "nombreLicencies").attr("id", "nbLicenciesRegion");
affichageHover.append("p").attr("class", "texteLicencies").text("LICENCIÉS");
affichageHover.append("hr").attr("id", "sep");
affichageHover.append("p").attr("class", "nombreLicencies").attr("id", "pourcentLabelLicencies");
affichageHover.append("p").attr("class", "texteLicencies").attr("id", "pourcentLabel");
affichageHover.append("p").attr("id", "nomRegion");
affichageHover.append("p").attr("id", "infosCalcul").text("Surfaces calculées en proportion au nombre de licenciés en 2015 par rapport à la population totale de chacune des régions françaises");
//ajout des margin du nom de la région survolée
d3.select("#nomRegion").style("margin-top", "30px").style("margin-bottom", "50px");

var margin = {top: 20, right: 0, bottom: 0, left: 0},
    width = 635,
    height = 357,
    formatNumber = d3.format(",d"),
    transitioning;

var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([0, height]);

var treemap = d3.layout.treemap()
    .children(function(d, depth) { return depth ? null : d._children; })
    .sort(function(a, b) { return a.value - b.value; })
    .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
    .round(false);

var svg = d3.select("#dataviz1").append("svg")
    .attr("width", width)
    .attr("height", height + margin.top)
  .append("g")
    .attr("transform", "translate( 0," + margin.top + ")")
    .style("shape-rendering", "crispEdges");

var grandparent = svg.append("g")
    .attr("class", "grandparent");
    

/*Bandeau de retour*/
grandparent.append("rect")
    .attr("y", -margin.top)
    .attr("width", width)
    .attr("height", margin.top);

grandparent.append("text")
    .attr("x", 6)
    .attr("y", 6 - margin.top)
    .attr("dy", ".75em");

d3.json("json/licences_regions_test.json", function(root) {
  initialize(root);
  accumulate(root);
  layout(root);
  display(root);

    function initialize(root) {
        root.x = root.y = 0;
        root.dx = width;
        root.dy = height;
        root.depth = 0;
    }
    
    //màj des données à afficher initialement
    function majData(){
        d3.select("#titreDataviz1").html("EN FRANCE, ON RETROUVE LES " + pdl.name + " EN 3<sup>e</sup> POSITION AVEC " + pdl.value + " LICENCIÉS");
        d3.select("#pourcentLabelLicencies").text(pourcent+"%");
        d3.select("#nbLicenciesRegion").text(pdl.value);
        d3.select("#nomRegion").text(pdl.name);
        d3.select("#infosCalcul").text("Surfaces calculées en proportion au nombre de licenciés en 2015 par rapport à la population totale de chacune des régions françaises");
        d3.select("#pourcentLabel").text("DES LICENCIÉS EN FRANCE");
        
    }
    
    function majDataDept(d){
        
        var loire_atlan;
        for(var i = 0;i < d._children.length; i++){
            if(d._children[i].name == "LOIRE-ATLANTIQUE")
                loire_atlan = d._children[i];
        }
        // changement du titre et des éléments fixes
        d3.select("#titreDataviz1").html("ET AU SEIN DES PAYS DE LA LOIRE, LA LOIRE-ATLANTIQUE SE TROUVE 1<sup>re</sup> AVEC " + loire_atlan.value + " LICENCIÉS");
        d3.select("#pourcentLabel").text("DES LICENCIÉS DE LA RÉGION");
        d3.select("#infosCalcul").text("Surfaces calculées en proportion au nombre de licenciés en 2015 par rapport à la population totale de chacun des départements");
    }
    
    
  // Aggregate the values for internal nodes. This is normally done by the
  // treemap layout, but not here because of our custom implementation.
  // We also take a snapshot of the original children (_children) to avoid
  // the children being overwritten when when layout is computed.
  function accumulate(d) {
    return (d._children = d.children)
        ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
        : d.value;
  }

  // Compute the treemap layout recursively such that each group of siblings
  // uses the same size (1×1) rather than the dimensions of the parent cell.
  // This optimizes the layout for the current zoom state. Note that a wrapper
  // object is created for the parent node for each group of siblings so that
  // the parent’s dimensions are not discarded as we recurse. Since each group
  // of sibling was laid out in 1×1, we must rescale to fit using absolute
  // coordinates. This lets us use a viewport to zoom.
  function layout(d) {
    if (d._children) {
        
      treemap.nodes({_children: d._children});
      d._children.forEach(function(c) {
        c.x = d.x + c.x * d.dx;
        c.y = d.y + c.y * d.dy;
        c.dx *= d.dx;
        c.dy *= d.dy;
        c.parent = d;
        layout(c);
      });
    }
  }

  function display(d) {
    // zone de retour dans l'arbre
    grandparent
        .datum(d.parent)
        .on("click", function(d){
        transition(d);
        majData(); // on met à jour les titres initiaux
        overZone(root); // détecter le mouseover au après clic sur retour
    })
      .select("foreignObject")
        .text(name(d));
      
       

    var g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");
      
      d3.select(".depth").attr("width", width).attr("height", height);
    var g = g1.selectAll("g")
        .data(d._children)
      .enter().append("g");

      // aller en profondeur dans l'arbre
    g.filter(function(d) { 
        return d._children; })
        .classed("children", true)
        .on("click", function(d){
        transition(d);
        majDataDept(d); // on affiche les infos spécifiques aux départements
        // affiche le nombre de licenciés dans la région
        overZone(d);
    
    });

    g.selectAll(".child")
        .data(function(d) { return d._children || [d]; })
      .enter().append("rect")
        .attr("class", "child")
        .call(rect);

    g.append("rect")
        .attr("class", "parent")
        .call(rect)
      .append("title");

      // renseigne le nom des régions dans le treemap
    g.append("foreignObject")
        .attr("dy", ".75em")
        .text(function(d) { return d.name; })
        .call(text)
        .style("color","#FFFFDF");
    
    function transition(d) {
    if (transitioning || !d) return;

    transitioning = true;

    var g2 = display(d),
    t1 = g1.transition().duration(750),
    t2 = g2.transition().duration(750);

    // Update the domain only after entering new elements.
    x.domain([d.x, d.x + d.dx]);
    y.domain([d.y, d.y + d.dy]);

    // Enable anti-aliasing during the transition.
    svg.style("shape-rendering", null);

    // Draw child nodes on top of parent nodes.
    svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

    // Fade-in entering text.
    g2.selectAll("foreignObject").style("fill-opacity", 0);

    // Transition to the new view.
    t1.selectAll("foreignObject").call(text).style("fill-opacity", 0);
    t2.selectAll("foreignObject").call(text).style("fill-opacity", 1);
    t1.selectAll("rect").call(rect);
    t2.selectAll("rect").call(rect);

    // Remove the old node when the transition is finished.
    t1.remove().each("end", function() {
    svg.style("shape-rendering", "crispEdges");
    transitioning = false;
    // majDataDept();
    });
    }

        return g;
  }

    function text(text) {
        text.attr("x", function(d) { return x(d.x) + 6; })
            .attr("y", function(d) { return y(d.y) + 6; });
    }

    function rect(rect) {
        
        rect.attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
        .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
    }

    function name(d) {
        return d.parent
        ? name(d.parent) + "." + d.name
        : d.name;
    }
        
    // retourne la région PDL parmis toutes les régions
    function findPDL(d){
        for(var i =0;i < d._children.length; i++){
            if(d._children[i].name == "PAYS-DE-LA-LOIRE")
               return d._children[i];
        }
        return null;
    }
    
    
    // on récupère la région PDL
    var pdl = findPDL(root);
    
    //calcul du pourcentage des pays de la loire pour afficher au début
    var pourcent = Math.round((pdl.value / root.value *100)*100)/100;
    
    majData();
    
    function overZone(d1){   
         // affiche le nombre de licenciés dans la région
        d3.selectAll(".parent, .child").on("mouseover", function(d){
        d3.select("#nbLicenciesRegion").text(d.value);
        d3.select("#nomRegion").text(d.name);
        pourcent = Math.round((d.value / d1.value *100)*100)/100;
        d3.select("#pourcentLabelLicencies").text(pourcent + "%");
    });
    }
   
    overZone(root);
    
    d3.select(".depth").attr("width", width).attr("height", height);
    
});