var d3 = window.d3,
    selectedData, 
    val,
    point;

var podiums = [
    {
        gagnants: ["François Gabart", "Armel Le Cléac’h", "Alex Thomson"],
        temps: ["78 j 2 h 16 min 40s", "78 j 5 h 33 min 52s", "80 j 19 h 23 min 43 s"]
    },
    {
        gagnants: ["Michel Desjoyeaux", "Armel Le Cléac’h", "Marc Guillemot"],
        temps: ["84 j 3 h 9 min 8 s", "89 j 9 h 39 min 35 s", "95 j 3 h 19 min 36 s"]
    },
    {
        gagnants: ["Vincent Riou", "Jean Le Cam", "Mike Golding"],
        temps: ["87 j 10 h 47 min 55 s", "87 j 17 h 20 min 8 s", "88 j 15 h 15 min 13 s"]
    },
    {
        gagnants: ["Michel Desjoyeaux", "Ellen MacArthur", "Roland Jourdain"],
        temps: ["93 j 3 h 57 min", "94 j 4 h 25 min", "96 j 1 h 2 min"]
    },
    {
        gagnants: ["Christophe Auguin", "Marc Thiercelin", "Hervé Laurent"],
        temps: ["105 j 20 h 31 min", "113 j 8 h 26 min", "114 j 16 h 43 min"]
    },
    {
        gagnants: ["Alain Gautier", "J-L Van Den Heede", "Philippe Poupon"],
        temps: ["110 j 2 h 22 min 35 s", "113 j 8 h 26 min", "114 j 16 h 43 min"]
    },
    {
        gagnants: ["Titouan Lamazou", "Loïck Peyron", "Jean-Luc Van Den Heede"],
        temps: ["109 j 08 h 48 min 50 s", "110 j 1 h 18 min 6 s", "112 j 1 h 14 min 0 s"]
    }
];

var courbe = [
    ["1989 — 1990", "1989", "109 j 08 h 48 min", "2624"],
    ["1992 — 1993", "1992", "110 j 2 h 22 min", "2642"],
    ["1996 — 1997", "1996", "105 j 20 h 31 min", "2540"],
    ["2000 — 2001", "2000", "93 j 3 h 57 min", "2235"],
    ["2004 — 2005", "2004", "87 j 10 h 47 min", "2098"],
    ["2008 — 2009", "2008", "84 j 3 h 9 min", "2019"],
    ["2012 — 2013", "2012", "78 j 2 h 16 min", "1876"],
].reverse();

function graphEnter(value) {
    val.select("[value='" + value + "']").style("opacity", 1);
}

function graphLeave(value) {
    console.log(value);
    if (value != 1876 && value != 2624) {
        val.select("[value='" + value + "']").style("opacity", 0);
    }
}

function drawCurve() {
    
    var container = '#victoire_data_evolution';
    
    var margin = {top: 20, right: 38, bottom: 30, left: 60},
        width = $(container).width() - margin.left - margin.right,
        height = $(container).height() - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([width, 0]);
    var y = d3.scale.linear().range([height, 0]);
    var color = d3.scale.category10();
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);
    
    var line = d3.svg.line()
        .defined(function(d) { return d.value != ''; })
  	    .interpolate("cardinal")
        .x(function(d, i) {
            return  x(i) + x.rangeBand()/2;
        })
      	.y(function(d) {
      	    return y(d.value);
      	});
    
    var svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    svg
        .style("opacity", 0)
        .transition()
        .duration(400)
        .style("opacity", 1);
    
    color.domain(d3.keys(courbe[0]).filter(function(key) { return key !== "id"; }));
    
    var column = color.domain().map(function(name) {
        return {
            name: name,
            values: courbe.map(function(d) {
                return {name: d[2], id: d[0], value: +d[3]};
            })
        };
    });
    
    x.domain(d3.range(courbe.length));
    
    y.domain([
        d3.min(column, function(c) {
            return d3.min(c.values, function(v) { return v.value; });
        }),
        d3.max(column, function(c) {
            return d3.max(c.values, function(v) { return v.value; });
        })
    ]).nice();
    
    svg.append("g")
        .attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis)
      	.selectAll("text")
      	.each(function(h, i, e) {
      	    this.textContent = courbe[i][1];
      	});

    svg.selectAll(".x.axis")	
        .append("rect")
      	.attr("width", width)
      	.attr("height", 1)
      	.attr("fill", "#2c4c7d");
    
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Heures");
    
    var tracciato = svg.selectAll(".line-group")
        .data(column)
        .enter().append("g")
        .attr("class", "line-group");

    tracciato.append("path")
        .attr("class", "line")
        .attr("d", function(d) {
            return line(d.values);
        })
        .style("stroke", function(d) {
            return color(d.name);
        });
    
    val = tracciato.append('g')
        .attr('class', 'valori');
    
    val.selectAll('text')
        .data(function(d,i){ return d.values})
        .enter().append('text')
        .attr("x", function(d, i) {
            return x(i) + x.rangeBand() / 2;
        })
        .attr("y", function(d, i) {
            return y(d.value);
        })
        .attr('dx', function(d, i) {
            if (i == 0 || i == 6) {
                return 25;
            }
            return 0;
        })
        .attr('dy', function(d, i) {
            if (i == 0 || i == 6) {
                return -20;
            }
            return 30;
        })
        .attr('value', function(d) {
            return d.value;
        })
        .style("opacity", function(d, i) {
            if (i == 0 || i == 6) {
                return 1;
            }
            return 0;
        })
        .style("background-color", "white")
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.name;
        });
        
    point = tracciato.append("g")
        .attr("class", "line-point");
    
    point.selectAll('circle')
        .data(function(d,i) {
            return d.values;
        })
        .enter().append('circle')
        .attr("cx", function(d, i) {
            return x(i) + x.rangeBand() / 2;
        })
        .attr("cy", function(d, i) {
            return y(d.value);
        })
        .attr("r", 0)
        .on("mouseenter", function(d) {
            graphEnter(d.value);
        })
        .on("mouseleave", function(d) {
            graphLeave(d.value);
        })
        .transition()
        .delay(function(d, i) {
            return (7 - i) * 50;
        })
        .duration(500)
        .ease("bounce")
        .attr("r", 5);

}

function onclick(el, i) {
    
    animateRects();
    
    if (selectedData) {
        selectedData.attr("style", null);
    }
    selectedData = el;
    el.style("color", "#be1522");
    
    var m1 = d3.select(document.getElementById("victoire_podium").contentDocument).select("#_1marche1");
    m1.select(".cls-4").text(podiums[i].gagnants[0]);
    m1.select(".cls-5").text(podiums[i].temps[0]);
    
    var m2 = d3.select(document.getElementById("victoire_podium").contentDocument).select("#_1marche2");
    m2.select(".cls-4").text(podiums[i].gagnants[1]);
    m2.select(".cls-5").text(podiums[i].temps[1]);
    
    var m3 = d3.select(document.getElementById("victoire_podium").contentDocument).select("#_1marche3");
    m3.select(".cls-4").text(podiums[i].gagnants[2]);
    m3.select(".cls-5").text(podiums[i].temps[2]);
    
}

function animateRects() {
    
    var podiums = d3.select(document.getElementById("victoire_podium").contentDocument);
    
    podiums.select("#_1marche3")
    .attr("transform", "translate(0,140)")
    .transition()
    .duration(800)
    .ease("sin")
    .attr("transform", "translate(-4, 0)");
    
    podiums.select("#_1marche2")
    .attr("transform", "translate(0,170)")
    .transition()
    .duration(800)
    .delay(150)
    .ease("sin")
    .attr("transform", "translate(4, 0)");
    
    podiums.select("#_1marche1")
    .attr("transform", "translate(0,190)")
    .transition()
    .duration(800)
    .delay(300)
    .ease("sin")
    .attr("transform", "translate(0, 0)");
    
    d3.select('#victoire_podium').style("visibility", "visible");

}

module.exports = exports = function() {
    
    var li = d3.select("#victoire_meilleur_temps").select("ul").selectAll("li")[0];
    
    li.forEach(function(el, i) {
        
        var element = d3.select(el);
        element.on("click", function() {
            onclick(element, i);
        });
        
    });
    
    animateRects();
    drawCurve();
};