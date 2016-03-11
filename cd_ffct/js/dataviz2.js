"use strict";

d3.json("json/evolution_licences_par_activites_et_categories_test.json", function(error, json) {
    
    var color = [
        ["#2484c1", "#1060a1"],
        ["#cb2121", "#ad0808"],
        ["#70f71a", "#30c712"]
    ];
    
    /*  **************************************************  */
    /*                      Dataset                         */
    /*  **************************************************  */
    if (error) {
        throw error;
    }
    
    var datasetPieChart = new Array();
    
    // Pour chaque type d'activité (Route, VTT, BMX)
    for (var i = 0; i < json.children.length; i++) {
        var data = new Object();
        data.label = json.children[i].name;
        data.value = 0;
        data.color = color[i][0];
        
        // Pour chacune des catégories (ELITE PROFESSIONNEL, 1ERE CATEGORIE, ...)
        for (var j = 0; j < json.children[i].children.length; j++) {
            data.value += json.children[i].children[j].size;
        }
        
        // Affectation au dataset
        datasetPieChart[i] = data;
    }
    
    var datasetBarChart_init = new Object();
    datasetBarChart_init.label = "init";
    datasetBarChart_init.values = new Array();
    for (var j = 0; j < json.children[0].children.length; j++) {
        var o = new Object();
        o.label = json.children[0].children[j].name;
        o.value = 0;
        datasetBarChart_init.values[j] = o;
    }
    
    
    var datasetBarChart = new Array();
    
    // Pour chaque type d'activité (Route, VTT, BMX)
    for (var i = 0; i < json.children.length; i++) {
        var data = new Object();
        data.label = json.children[i].name;
        data.values = new Array();
        
        // Pour chacune des catégories (ELITE PROFESSIONNEL, 1ERE CATEGORIE, ...)
        for (var j = 0; j < json.children[i].children.length; j++) {
            var o = new Object();
            o.label = json.children[i].children[j].name;
            o.value = json.children[i].children[j].size;
            data.values[j] = o;
        }
        
        // Affectation au dataset
        datasetBarChart[i] = data;
    }
    
    
    /*  **************************************************  */
    /*                      PieChart                        */
    /*  **************************************************  */
    var pieChart = new d3pie("pieChart", {
        "header": {
            "title": {
                "text": "TITRE",
                "fontSize": 22,
                "font": "verdana"
            },
            "subtitle": {
                "text": "Sous titre",
                "color": "#999999",
                "fontSize": 10,
                "font": "verdana"
            },
            "titleSubtitlePadding": 12
        },
        "footer": {
            "text": "Source: me, my room, the last couple of months.",
            "color": "#999999",
            "fontSize": 11,
            "font": "open sans",
            "location": "bottom-center"
        },
        "size": {
            "canvasHeight": 200, //400
            "canvasWidth": 300, //590
            "pieInnerRadius": "40%",
            "pieOuterRadius": "100%"
        },
        "data": {
            "content": datasetPieChart,
        },
        "labels": {
            "outer": {
                "format": "none",
                "pieDistance": 32
            },
            "inner": {
                "format": "label"
            },
            "mainLabel": {
                "font": "verdana"
            },
            "percentage": {
                "color": "#e1e1e1",
                "font": "verdana",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#e1e1e1",
                "font": "verdana"
            },
            "lines": {
                "enabled": true,
                "color": "#cccccc"
            },
            "truncation": {
                "enabled": true
            }
        },
        "effects": {
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 500,
                "size": 15
            }
        },
        "callbacks": {
            onClickSegment: clickSegment
        }
    });
    
    function clickSegment(d) {
        for (var i = 0; i < json.children.length; i++) {
            if (json.children[i].name == d.data.label) {
                hist.update(datasetBarChart[i], color[i]);
                break;
            }
        }
    }
    
    
    /*  **************************************************  */
    /*                      BarChart                        */
    /*  **************************************************  */
    function histogram(id, data) {
        
        var hist = {};
        var histColor = "";
        var margin = {top: 20, right: 20, bottom: 200, left: 80};
        var width = 500 - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;
        
        var svg = d3.select(id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scale.ordinal().rangeRoundBands([0, width, 0.1])
            .domain(data.values.map(function(d) { return d.label; })); // Nom
        
        svg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"))
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );
        
        var y = d3.scale.linear().range([height, 0])
            .domain([0, d3.max(data.values, function(d) { return d.value; })]); // nombre
        
        var bars = svg.selectAll(".bar").data(data.values).enter()
            .append("g").attr("class", "bar");
        
        bars.append("rect")
            .attr("x", function(d) { return x(d.label); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return height - y(d.value); })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);
        
        bars.append("text").text(function(d) { return d3.format(",")(d.value); })
            .attr("x", function(d) { return x(d.label)+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d.value)-5; })
            .attr("text-anchor", "middle");
        
        function mouseover(d) {
            d3.select(this).attr("fill", histColor[1]);
        }
        
        function mouseout(d) {
            d3.select(this).attr("fill", histColor[0]);
        }
        
        hist.update = function(data, color) {
            histColor = color;
            y.domain([0, d3.max(data.values, function(d) { return d.value; })]);
            
            var bars = svg.selectAll(".bar").data(data.values);
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", histColor[0]);
            
            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d.value)})
                .attr("y", function(d) {return y(d.value)-5; });
        }
        
        return hist;
    }
    
    var hist = histogram("#barChart", datasetBarChart_init);
});