 var series1= [
    {
      label: 'REZE',
      values: 0.08
    },
    {
      label: 'SAINT-NAZAIRE',
      values: 0.066
    },
    {
      label: 'PORNIC',
      values: 0.038
    }];
var series2= [
    {
      label: 'REZE',
      values: 0.0031
    },
    {
      label: 'SAINT-NAZAIRE',
      values: 0.0029
    },
    {
      label: 'PORNIC',
      values: 0.0053
    }];

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 220 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
.tickFormat('')
    .tickSize(0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y).tickSize(0)
    .orient("left");

var svg1 = d3.select("#barchart3").select("#svg1")
    .attr("viewBox", "0 0 220 380").attr("preserveAspectRatio","none")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#barchart3").select("#svg2")
    .attr("viewBox", "0 0 220 380").attr("preserveAspectRatio","none")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var addSvg = function (data,svg){
    x.domain(data.map(function(d) { return d.label; }));
  y.domain([0, 1]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("fill","none")
      .call(yAxis);
    
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bbar")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", 40)
      .attr("y", 0)
      .attr("height", height)
      .attr("fill", "#231F20");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", 40)
      .attr("y", function(d) { return y(d.values); })
      .attr("height", function(d) { return height - y(d.values); })
      .attr("fill", function(d){
        if(d.label === "REZE"){
            return "#FF3652";
        }
        if(d.label === "SAINT-NAZAIRE"){
            return "#42FF97";
        }
        if(d.label === "PORNIC"){
            return "#004CFF";
        }
      });
    
    svg.selectAll(".text")
      .data(data)
    .enter().append("text").text(function(d) {
        return (d.values * 100).toFixed(1) + "%";
   }).attr("x", function(d) { return x(d.label); }).attr("y", -5).attr("fill",'white');
}

addSvg(series1,svg1);
addSvg(series2,svg2);
$("#budgetsDiv").height($("#equipeDiv").height());

