"use strict";

d3.json("json/evolution_licences_par_activites_et_categories_test.json", function(error, json) {
    if (error) { throw error; }
    
    var color = [
        ["#2484c1", "#1060a1"],
        ["#cb2121", "#ad0808"],
        ["#70f71a", "#30c712"]
    ];
    
    /*  **************************************************  */
    /*                      Dataset                         */
    /*  **************************************************  */
    var dataSet = json.children;
    
    var initPieChart = [];
    // Pour chaque type d'activité (Route, VTT, BMX)
    for (var i = 0; i < dataSet.length; i++) {
        var data = {};
        data.label = dataSet[i].label;
        data.value = 0;
        data.color = color[i][0];
        
        // Calcul de la valeur associée à l'activité (somme des licenciés des différentes catégories)
        for (var j = 0; j < dataSet[i].children.length; j++) {
            data.value += dataSet[i].children[j].value;
        }
        
        initPieChart.push(data);
    }
    
    // On crée un tableau contenant le nom de toutes les catégories
    // et on associe à ces catégories la valeur 0 lorsqu'aucune activité n'est sélectionnée (lorsque la page est chargée)
    var initBarChart = []
    for (var i = 0; i < dataSet[0].children.length; i++) {
        var data = {};
        data.label = dataSet[0].children[i].label;
        data.value = 0;
        initBarChart.push(data);
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
            "content": initPieChart,
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
            if (dataSet[i].label == d.data.label) {
                hist.update(dataSet[i].children, color[i]);
                break;
            }
        }
    }
    
    
    /*  **************************************************  */
    /*                      BarChart                        */
    /*  **************************************************  */
    function histogram(id, datas) {
        
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
            .domain(datas.map(function(d) { return d.label; }));
        
        svg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"))
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );
        
        var y = d3.scale.linear().range([height, 0])
            .domain([0, d3.max(datas, function(d) { return d.value; })]);
        
        var bars = svg.selectAll(".bar").data(datas).enter()
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
        
        hist.update = function(datas, color) {
            histColor = color;
            y.domain([0, d3.max(datas, function(d) { return d.value; })]);
            
            var bars = svg.selectAll(".bar").data(datas);
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
    
    var hist = histogram("#barChart", initBarChart);
});