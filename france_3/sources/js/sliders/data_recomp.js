var d3 = window.d3;

module.exports = exports = function() {

var data = [
    {"event":"Vendée Globe 2012", "practice":112456,"gain":1.42},
    {"event":"Paris-Dakar 2016", "practice":2889,"gain":17.31},
    {"event":"Touquet 2015", "practice":182,"gain":82.42},
    {"event":"Tour de France 2015", "practice":5146,"gain":87.45},
    {"event":"24h du Mans 2015", "practice":1440,"gain":138.89},
    {"event":"Marathon de Paris 2015", "practice":129,"gain":387.60},
    {"event":"Rolland Garros 2015", "practice":955,"gain":1884.82}
];
  
var w = window.innerWidth * 0.6,
    h = window.innerHeight * 0.7,
    topMargin = 40,
    labelSpace = 110,
    innerMargin = w/2+labelSpace,
    outerMargin = 15,
    gap = 12,
    dataRange = d3.max(data.map(function(d) { return Math.max(d.practice, d.gain) })),
    leftLabel = "Gain / Minute (€/min)",
    rightLabel = "Temps de pratique (min)",
    k = d3.max(data.map(function(d) { return d.practice })) / d3.max(data.map(function(d) { return d.gain }));

var chartWidth = w - innerMargin - outerMargin,
    barWidth = h / data.length-50,
    yScale = d3.scale.linear().domain([0, data.length]).range([0, h-topMargin]),
    total = d3.scale.linear().domain([0, dataRange]).range([0, chartWidth - labelSpace+20]),
    commas = d3.format(",.0f");

var vis = d3.select("#vis").append("svg")
    .attr("width", w)
    .attr("height", h);
    
vis.style("opacity", 0)
   .transition()
   .duration(500)
   .style("opacity", 1);

vis.append("text")
  .attr("class", "titre")
  .text(leftLabel)
  .attr("x", w-innerMargin)
  .attr("y", topMargin-15)
  .attr("text-anchor", "end");

vis.append("text")
  .attr("class", "titre")
  .text(rightLabel)
  .attr("x", innerMargin)
  .attr("y", topMargin-15);


var bar = vis.selectAll("g.bar")
    .data(data)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d, i) {
      return "translate(0," + (yScale(i) + topMargin)+ ")";
    });
    
var highlight = function(c) {
  return function(d, i) {
    bar.filter(function(d, j) {
      return i === j;
    }).attr("class", c);
  };
  

};

var rectHeight = (h / data.length + 1) - gap;
if (rectHeight < 3) {
  rectHeight = 3;
}

bar
  .on("mouseover", highlight("highlight bar"))
  .on("mouseout", highlight("bar"));

bar.append("rect")
    .attr("class", "femalebar")
    .attr("height", rectHeight)
    .attr("rx",5)
    .attr("ry",5);

bar.append("text")
    .attr("class", "femalebar")
    .attr("dx", -16)
    .attr("dy", "1em")
    .attr("text-anchor", "end");

bar.append("rect")
    .attr("class", "malebar")
    .attr("height", rectHeight)
    .attr("x", innerMargin)
    .attr("rx",5)
    .attr("ry",5);

bar.append("text")
    .attr("class", "malebar")
    .attr("dx", 16)
    .attr("dy", "1em");

bar.append("text")
    .attr("class", "shared event")
    .attr("x", w/2)
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.event; });


d3.select("#generate").on("click", function() {
  refresh(data);
});

refresh(data);

function refresh(data) {
  var bars = d3.selectAll("g.bar")
      .data(data);
     
  bars.selectAll("rect.malebar")
    .transition()
      .attr("width", function(d) { return total(d.practice); });
  bars.selectAll("rect.femalebar")
    .transition()
      .attr("x", function(d) { return innerMargin - k*total(d.gain) - 2 * labelSpace; }) 
      .attr("width", function(d) { return k*total(d.gain); });

  bars.selectAll("text.malebar")
      .text(function(d) { return commas(d.practice); })
    .transition()
      .attr("x", function(d) { return innerMargin + total(d.practice); });
  bars.selectAll("text.femalebar")
      .text(function(d) { return commas(d.gain); })
    .transition()
      .attr("x", function(d) { return innerMargin - k*total(d.gain) - 2 * labelSpace; });
}

};