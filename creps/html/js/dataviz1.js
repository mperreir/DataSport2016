functiondraw(dataset){
    var margin = {top: 40, right: 20, bottom: 30, left: 40};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var barPadding = 1;
    
    // Création de l'élément SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width",larg)
        .attr("height",haut);
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x",function(d,i) {
            return i*(20+barPadding);
        })
        .attr("y",function(d){
            return haut - (d.valeur*2);
        })
        .attr("width",20)
        .attr("height",function(d){ 
            return(d.valeur*2);
        })
        .attr("fill","teal");
}
