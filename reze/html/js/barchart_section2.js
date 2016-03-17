/*
var data = {
  labels: [
    'Nombre de licensiés par rapport à la population globale', 'Nombre de licensiés féminins par rapport aux licensiés', 'Nombre de licensiés de -18ans par rapport aux licensiés'
  ],
  series: [
    {
      label: 'REZE',
      values: [0.243, 0.426, 0.469]
    },
    {
      label: 'SAINT-NAZAIRE',
      values: [0.268, 0.459, 0.474]
    },
    {
      label: 'PORNIC',
      values: [0.365, 0.374, 0.428]
    }]
};
*/

/*var chartHeight       = 300,
    barWidth        = 20,
    groupWidth      = barWidth * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 150;

var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}
var color = d3.scale.category20();
var chartWidth = barWidth * zippedData.length + gapBetweenGroups * data.labels.length;

var y = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartHeight]);

var x = d3.scale.linear()
    .range([chartWidth + gapBetweenGroups, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat('')
    .tickSize(0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat('.1%');

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", chartWidth)
    .attr("height", spaceForLabels + chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      //return "translate(" + spaceForLabels + "," + (i * barWidth + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
        return "translate(" + (i * barWidth + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + "," + 0 + ")";
    });

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % data.series.length); })
    .attr("class", "bar")
    .attr("width", barWidth - 1)
    .attr("height", y);

// Add text label in bar
bar.append("text")
    .attr("x", barWidth / 2)
    .attr("y", function(d) { return y(d) - 3; })
    .attr("fill", "red")
    .attr("dx", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", groupWidth / 2)
    .attr("y", function(d) { return - 10; })
    .attr("dx", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return ""});

chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + 0 + ", " + chartHeight + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);*/

var series1= [
    {
      label: 'REZE',
      values: 0.243
    },
    {
      label: 'SAINT-NAZAIRE',
      values: 0.268
    },
    {
      label: 'PORNIC',
      values: 0.365
    }];
var series2= [
    {
      label: 'REZE',
      values: 0.426
    },
    {
      label: 'SAINT-NAZAIRE',
      values: 0.459
    },
    {
      label: 'PORNIC',
      values: 0.374
    }];
var series3= [
    {
      label: 'REZE',
      values: 0.469
    },
    {
      label: 'SAINT-NAZAIRE',
      values: 0.474
    },
    {
      label: 'PORNIC',
      values: 0.428
    }];

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 220 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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
    .scale(y)
    .orient("left")
    .ticks(10,"%");

var svg1 = d3.select("#barchart2").select("#svg1")
    .attr("viewBox", "0 0 220 380").attr("preserveAspectRatio","none")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#barchart2").select("#svg2")
    .attr("viewBox", "0 0 220 380").attr("preserveAspectRatio","none")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg3 = d3.select("#barchart2").select("#svg3")
    /*.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)*/
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
        return (d.values *100).toFixed(1) + "%";
   }).attr("x", function(d) { return x(d.label); }).attr("y", 0).attr("fill",'white');
}

addSvg(series1,svg1);
addSvg(series2,svg2);
addSvg(series3,svg3);