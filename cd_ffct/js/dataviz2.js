"use strict";

$(document).ready(function() {
    d3.json("json/evolution_licences_par_activites_et_categories_test.json", function(error, json) {
        
        if (error) { throw error; }


        /*  **************************************************  */
        /*                      Initialisation                  */
        /*  **************************************************  */
        var dataviz = d3.select("#dataviz2"),
            datavizWidth = $("#dataviz2").width(),
            datavizHeight = $("#dataviz2").height();
        
        // Création du titre
        dataviz.append("h1").text("Découvrez alors comment se répartissent les niveaux et catégories en fonction de 3 grandes pratiques");
        
        // Création du svg
        var svg = dataviz.append("svg")
                .attr("width", datavizWidth)
                .attr("height", (datavizHeight - $("#dataviz2 h1").height()) - parseInt($("#dataviz2 h1").css("marginBottom")) + "px");

        // Booléen qui permet de savoir si l'on a déjà cliqué sur le pieChart
        var firstTime = true;

        // On créé un objet vide pour l'histogramme.
        // Lors du premier clique sur le pieChart, l'histogramme sera créé
        var hist = {};
        
        /*  **************************************************  */
        /*                      Configuration                   */
        /*  **************************************************  */
        var colors = ["#9BC8D9", "#F56D34", "#F4DC78"];
        
        var conf = {
            pieChart: {
                // Initialisation
                init: {
                    width: 329,
                    height: 329,
                    translateX: (datavizWidth / 2),
                    translateY: (datavizHeight / 2)
                },
                
                // General
                ratioRadius: (40 / 100),
                width: 159,
                height: 159,
                
                // Activités
                route: {
                    translateX: 85,
                    translateY: 120
                },
                vtt: {
                    translateX: 750,
                    translateY: 120
                },
                bmx: {
                    translateX: 750,
                    translateY: 250
                },
                
                // Transitions
                duration: 1000,
                delay: 0
            },
            barChart: {
                // Activités
                route: {
                    translateX: 200,
                    translateY: 50
                },
                vtt: {
                    translateX: 200,
                    translateY: 50
                },
                bmx: {
                    translateX: 200,
                    translateY: 50
                },
                
                // Transitions
                duration: 1000,
                delay: 0
            },
            legend: {
                init: {
                    translateX: datavizWidth / 2,
                    translateY: datavizHeight / 2
                },
                
                // Activités
                route: {
                    translateX: 650,
                    translateY: 200
                },
                vtt: {
                    translateX: 0,
                    translateY: 200
                },
                bmx: {
                    translateX: 0,
                    translateY: 200
                },
                
                // Transitions
                duration: 1000,
                delay: 0
            }
        }


        /*  **************************************************  */
        /*                      Dataset                         */
        /*  **************************************************  */
        var dataSet = [];
        // Pour chacune des activités (Route, VTT, BMX)
        for (var i = 0; i < json.length; i++) {
            var activity = {};
            activity.color = colors[i];
            activity.label = json[i].label;
            activity.sum = 0;
            activity.mens = [];
            activity.womens = [];
            
            // Pour chacune des catégories
            for (var j = 0; j < json[i].children.length; j++) {
                activity.sum += json[i].children[j].men + json[i].children[j].women;
                activity.mens.push({label: json[i].children[j].label, y: json[i].children[j].men});
                activity.womens.push({label: json[i].children[j].label, y: json[i].children[j].women});
            }

            dataSet.push(activity);
        }
        
        
        var dataSet_barChartInit = {};
        dataSet_barChartInit.mens = [];
        dataSet_barChartInit.womens = [];
        for (var j = 0; j < json[0].children.length; j++) {
            dataSet_barChartInit.mens.push({label: json[0].children[j].label, y: 0});
            dataSet_barChartInit.womens.push({label: json[0].children[j].label, y: 0});
        }

        /*  **************************************************  */
        /*                      Dataviz                         */
        /*  **************************************************  */
        pieChart("#dataviz2");

        hist = histogram("#dataviz2", dataSet_barChartInit);

        // Div contenant des informations lorsque l'utilisateur clique sur un quartier du pieChart
        var legend = svg.append("g")
            .attr("id", "legend")
            .style("font-family", "source sans pro")
            .style("text-transform", "uppercase")
            .attr("transform", "translate(" + conf.legend.init.translateX + "," + conf.legend.init.translateY + ")");

        var labelNombre = legend.append("text")
            .style("font-size", "48px")
            .text("0")
            .attr("x", 0)
            .attr("y", 0);

        var labelTexte = legend.append("text")
            .style("font-size", "29px")
            .text("licenciés")
            .attr("x", 0)
            .attr("y", 25);

        // On cache le barchart et la légende à l'initialisation
        d3.select("#barChart").style("visibility", "hidden");
        legend.style("visibility", "hidden");

        
        var source = svg.append("g")
            .attr("id", "source")
            .style("font-family", "source sans pro")
            .style("font-style", "italic")
            .style("fill", "#494949")
            .attr("transform", "translate(" + 720 + "," + 430    + ")")
        
        var labelSource1 = source.append("text")
            .style("font-size", "15px")
            .attr("x", 0)
            .attr("y", 0)
            .text("Valeur de 2015");
        
        var labelSource2 = source.append("text")
            .style("font-size", "15px")
            .attr("x", 0)
            .attr("y", 20)
            .text("en Loire-Atlantique");


        /*  **************************************************  */
        /*                      PieChart                        */
        /*  **************************************************  */    
        function pieChart(id) {
            var outerRadius = Math.min(conf.pieChart.init.width, conf.pieChart.init.height) / 2,
                innerRadius = outerRadius * conf.pieChart.ratioRadius;
            
            var arc = d3.svg.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);
            
            var arcOpen = d3.svg.arc()
                .outerRadius(Math.min(conf.pieChart.width, conf.pieChart.height) / 2 + 20)
                .innerRadius((Math.min(conf.pieChart.width, conf.pieChart.height) / 2) * conf.pieChart.ratioRadius + 20);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.sum; });

            var g = svg.append("g")
                .attr("id", "pieChart")
                .attr("transform", "translate(" + conf.pieChart.init.translateX + "," + conf.pieChart.init.translateY + ")");

            var gArc = g.selectAll(".arc")
                .data(pie(dataSet))
                .enter()
                .append("g")
                    .attr("class", "arc");

            var path = gArc.append("path")
                .attr("d", arc)
                .style("fill", function(d) { return d.data.color; })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("click", clickSegment);

            var pieChartText = gArc.append("text")
                .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .text(function(d) { return d.data.label; })
                .on("click", clickSegment);
            
            var pieChartTextCenter = gArc.append("text")
                .style("text-anchor", "middle")
            .style("font-size", "15px")
      .attr("dy", "0.35em");

            function mouseover(d) {
                path.attr("opacity", 0.5);
                d3.select(this).attr("opacity", 1);
            }

            function mouseout(d) {
                path.attr("opacity", 1);
            }

            function clickSegment(d) {
                
                // Si l'utilisateur n'a jamais cliqué sur le pieChart auparavant
                if (firstTime === true) {
                    firstTime = false;

                    outerRadius = Math.min(conf.pieChart.width, conf.pieChart.height) / 2;
                    innerRadius = outerRadius * conf.pieChart.ratioRadius;
                    
                    /*arc = d3.svg.arc()
                        .outerRadius(outerRadius)
                        .innerRadius(innerRadius);*/
                    
                    path.transition()
                        .duration(1000)
                        .attrTween("d", function(angle) {
                            var outer = d3.interpolate(arc.outerRadius()(), outerRadius);
                            var inner = d3.interpolate(arc.innerRadius()(), innerRadius);
                            var i = d3.interpolate(angle.startAngle + 0.1, angle.endAngle);
                            return function(t) {
                                angle.endAngle = i(t);
                                var arcTemp = arc.innerRadius(inner(t)).outerRadius(outer(t))(angle);
                                // Mise à jour des positions des labels
                                pieChartText.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; }).attr("dy", ".35em");
                                return arcTemp;
                            }
                        });
                    d3.select(this).transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("d", arcOpen);
                } else {
                    path.transition()
                        .duration(1000)
                        .attrTween("d", function(angle) {
                            var i = d3.interpolate(angle.startAngle + 0.1, angle.endAngle);
                            return function(t) {
                                angle.endAngle = i(t);
                                return arc(angle);
                            }
                        });

                    d3.select(this).transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("d", arcOpen);
                }
                
                var _dataSet = {},
                    _color = "",
                    _pieChart_TranslateX = 0,
                    _pieChart_TranslateY = 0,
                    _barChart_TranslateX = 0,
                    _barChart_TranslateY = 0,
                    _legend_TranslateX = 0,
                    _legend_TranslateY = 0
                
                switch (d.data.label) {
                    case "ROUTE":
                        _dataSet = dataSet[0];
                        _color = colors[0];
                        _pieChart_TranslateX = conf.pieChart.route.translateX;
                        _pieChart_TranslateY = conf.pieChart.route.translateY;
                        _barChart_TranslateX = conf.barChart.route.translateX;
                        _barChart_TranslateY = conf.barChart.route.translateY;
                        _legend_TranslateX = conf.legend.route.translateX;
                        _legend_TranslateY = conf.legend.route.translateY;
                        break;
                    case "VTT":
                        _dataSet = dataSet[1];
                        _color = colors[1];
                        _pieChart_TranslateX = conf.pieChart.vtt.translateX;
                        _pieChart_TranslateY = conf.pieChart.vtt.translateY;
                        _barChart_TranslateX = conf.barChart.vtt.translateX;
                        _barChart_TranslateY = conf.barChart.vtt.translateY;
                        _legend_TranslateX = conf.legend.vtt.translateX;
                        _legend_TranslateY = conf.legend.vtt.translateY;
                        break;
                    case "BMX":
                        _dataSet = dataSet[2];
                        _color = colors[2];
                        _pieChart_TranslateX = conf.pieChart.bmx.translateX;
                        _pieChart_TranslateY = conf.pieChart.bmx.translateY;
                        _barChart_TranslateX = conf.barChart.bmx.translateX;
                        _barChart_TranslateY = conf.barChart.bmx.translateY;
                        _legend_TranslateX = conf.legend.bmx.translateX;
                        _legend_TranslateY = conf.legend.bmx.translateY;
                        break;
                    default:
                        alert("Label inconnu");
                }
                
                // Mise à jour du jeu de données
                hist.update(_dataSet);
                
                // Mise à jour des couleurs
                legend.style("fill", _color);
                
                pieChartTextCenter.transition()
                    .duration(conf.legend.duration)
                    .delay(conf.legend.delay)
                    .style("fill", _color)
                    .text(_dataSet.label);
                
                // On met à jour les labels contenant les informations (somme des licenciés) sur l'activité sélectionnée
                labelNombre.transition()
                    .duration(conf.legend.duration)
                    .delay(conf.legend.delay)
                    .tween("text", function(d) {
                        var i = d3.interpolate(this.textContent,
                                               (_dataSet.mens.reduce(function(a, b) { return a + b.y; }, 0))
                                               + (_dataSet.womens.reduce(function(a, b) { return a + b.y; }, 0)));
                        return function(t) {
                            this.textContent = Math.round(i(t));
                        }
                    });
                
                // Transition pour le pieChart
                g.transition()
                    .duration(conf.pieChart.duration)
                    .delay(conf.pieChart.delay + 1000)
                    .attr("transform", "translate(" + _pieChart_TranslateX + "," + _pieChart_TranslateY + ")");
                
                // Transition pour le barChart
                hist.g.transition()
                    .duration(conf.barChart.duration)
                    .delay(conf.barChart.delay + 1000)
                    .attr("transform", "translate(" + _barChart_TranslateX + "," + _barChart_TranslateY + ")")
                    .style("visibility", "visible");
                
                // Transition pour la légende
                legend.transition()
                    .duration(conf.legend.duration + 1000)
                    .delay(conf.legend.delay + 1000)
                    .attr("transform", "translate(" + _legend_TranslateX + "," + _legend_TranslateY + ")")
                    .style("visibility", "visible");
            }
        }


        /*  **************************************************  */
        /*                      BarChart                        */
        /*  **************************************************  */
        function histogram(id, datas) {

            var hist = {};
            
            var histColor = datas.color;
            
            var stackedData = [];
            stackedData.push(datas.mens);
            stackedData.push(datas.womens);
            
            var stack = d3.layout.stack();
            var layers = stack(stackedData);
            var yStackMax = d3.max(layers, function(layer) {
                return d3.max(layer, function(d) {
                    return d.y0 + d.y;
                });
            });

            var margin = {top: 20, right: 20, bottom: 200, left: 80},
                width = 500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width, 0.1])
                .domain(datas.mens.map(function(d) { return d.label; }));
            
            /*var y = d3.scale.linear()
                .range([height, 0])
                .domain([0, d3.max(datas.categories, function(d) { return d.value; })]);*/
            var y = d3.scale.linear()
                .range([height, 0])
                .domain([0, yStackMax]);
            
            var xAxis = d3.svg.axis().scale(x).orient("bottom");            

            hist.g = svg.append("g")
                .attr("id", "barChart")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            hist.g.append("g").attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .style("font-family", "source sans pro")
                .style("font-style", "italic")
                .style("fill", "#494949")
                .style("font-size", "13px");
            
            var layer = hist.g.selectAll(".layer")
                .data(layers)
                .enter().append("g")
                .attr("class", "layer");
            
/*
            var bars = hist.g.selectAll(".bar").data(datas.categories).enter()
                .append("g").attr("class", "bar");*/
/*
            var rect = bars.append("rect")
                .attr("x", function(d) { return x(d.label); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x.rangeBand())
                .attr("height", function(d) { return height - y(d.value); })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);
*/
            
            var rect = layer.selectAll("rect")
                .data(function(d) { return d; })
                .enter().append("rect")
                .attr("x", function(d) { return x(d.label); })
                //.attr("y", height)
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.y0 + d.y); })
                .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);;
            /*
            bars.append("text")
                .text(function(d) { return d3.format(",")(d.value); })
                .attr("x", function(d) { return x(d.label)+x.rangeBand()/2; })
                .attr("y", function(d) { return y(d.value)-5; })
                .attr("text-anchor", "middle")
                .style("fill", "#494949");*/

            function mouseover(d) {
                rect.attr("opacity", 0.5);
                d3.select(this).attr("opacity", 1);
            }

            function mouseout(d) {
                rect.attr("opacity", 1);
            }

            hist.update = function(datas) {
                
                // Mise à jour des couleurs

                var stackedData = [];
                stackedData.push(datas.mens);
                stackedData.push(datas.womens);

                var stack = d3.layout.stack();
                var layers = stack(stackedData);
                var yStackMax = d3.max(layers, function(layer) {
                    return d3.max(layer, function(d) {
                        return d.y0 + d.y;
                    });
                });
                
                y.domain([0, yStackMax]);
                layer = hist.g.selectAll(".layer").data(layers);
                
                layer.selectAll("rect").data(function(d) { return d; })
                .transition()
                    .duration(500)
                    .attr("y", function(d) {
                            return y(d.y0 + d.y);
                    })
                    .attr("height", function(d) {
                        return y(d.y0) - y(d.y0 + d.y); })
                    .attr("fill", datas.color);
                
                // Mise à jour du domaine des valeurs de l'histogramme
                //y.domain([0, d3.max(datas.categories, function(d) { return d.value; })]);
/*
                // Mise à jour des valeurs de l'histogramme
                var bars = svg.selectAll(".bar").data(datas.categories);
                bars.select("rect")
                    .transition()
                        .duration(500)
                        .attr("y", function(d) {return y(d.value); })
                        .attr("height", function(d) { return height - y(d.value); })
                        .attr("fill", histColor);

                // Mise à jour du texte des bars de l'histogramme
                bars.select("text")
                    .transition()
                    .duration(500)
                        .delay(0)
                        .tween("text", function(d) {
                            var i = d3.interpolate(this.textContent, d.value);
                            return function(t) {
                                this.textContent = Math.round(i(t));
                            }
                        })
                    .attr("y", function(d) { return y(d.value)-5; });
                    */
            }

            return hist;
        }
    });
});