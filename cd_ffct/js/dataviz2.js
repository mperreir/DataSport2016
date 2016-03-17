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
        var colors = [
            ["#9BC8D9", "#D3E8F7"],
            ["#F56D34", "#FFA574"],
            ["#F4DC78", "#FFEFA0"]
        ];
        
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
            info: {
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
            activity.colors = colors[i];
            activity.label = json[i].label;
            activity.sum = 0;
            activity.men = [];
            activity.women = [];
            activity.all = [];
            
            // Pour chacune des catégories
            for (var j = 0; j < json[i].children.length; j++) {
                activity.sum += json[i].children[j].men + json[i].children[j].women;
                activity.men.push({label: json[i].children[j].label, y: json[i].children[j].men, sexe: "Homme"});
                activity.women.push({label: json[i].children[j].label, y: json[i].children[j].women, sexe: "Femme"});
                activity.all.push({label: json[i].children[j].label, y: json[i].children[j].men + json[i].children[j].women});
            }

            dataSet.push(activity);
        }
        
        
        var dataSet_barChartInit = {};
        dataSet_barChartInit.men = [];
        dataSet_barChartInit.women = [];
        dataSet_barChartInit.all = [];
        for (var j = 0; j < json[0].children.length; j++) {
            dataSet_barChartInit.men.push({label: json[0].children[j].label, y: 0, sexe: "Homme"});
            dataSet_barChartInit.women.push({label: json[0].children[j].label, y: 0, sexe: "Femme"});
            dataSet_barChartInit.all.push({label: json[0].children[j].label, y: 0});
        }

        /*  **************************************************  */
        /*                      Dataviz                         */
        /*  **************************************************  */
        pieChart("#dataviz2");
        
        hist = histogram("#dataviz2", dataSet_barChartInit);
        

        // Div contenant des informations lorsque l'utilisateur clique sur un quartier du pieChart
        var info = svg.append("g")
            .attr("id", "info")
            .style("font-family", "source sans pro")
            .style("text-transform", "uppercase")
            .attr("transform", "translate(" + conf.info.init.translateX + "," + conf.info.init.translateY + ")");

        var labelNombre = info.append("text")
            .style("font-size", "48px")
            .text("0")
            .attr("x", 0)
            .attr("y", 0);

        var labelTexte = info.append("text")
            .style("font-size", "29px")
            .text("licenciés")
            .attr("x", 0)
            .attr("y", 25);

        var colorsInit = ["#000000", "#000000"];
        var legend = info.selectAll(".legend")
            .data(colorsInit)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, m) { return "translate(0," + (m * (25 + 7) + 50) + ")"; });

        legend.append("rect")
            .attr("width", 25)
            .attr("height", 25);

        legend.append("text")
            .style("font-size", "15px")
            .attr("x", 30)
            .attr("y", 12)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d, i) {
                switch (i) {
                    case 0: return "Femmes";
                    case 1: return "Hommes";
                }
            });
        
        // On cache le barchart et la légende à l'initialisation
        d3.select("#barChart").style("visibility", "hidden");
        info.style("visibility", "hidden");

        
        var source = svg.append("g")
            .attr("id", "source")
            .style("font-family", "source sans pro")
            .style("font-style", "italic")
            .style("fill", "#494949")
            .attr("transform", "translate(" + 720 + "," + 430 + ")")
        
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
            var tooltip = d3.select('#dataviz2')
                .append('div')
                .attr('class', 'tooltipPieChart');

            tooltip.append('div')
                .attr('class', 'tooltipPieChart_label');

            tooltip.append('div')
                .attr('class', 'tooltipPieChart_value');
            
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
                .style("fill", function(d) { return d.data.colors[0]; })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("mousemove", mousemove)
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
                /*
                    FAIRE AVEC (d, i)  + if-else
                */
                path.attr("opacity", 0.5);
                d3.select(this).attr("opacity", 1);
                tooltip.select(".tooltipPieChart_label").html(d.data.label);
                tooltip.select(".tooltipPieChart_value").html(d.data.sum + " licencié(s)");
                tooltip.style("display", "block");
            }

            function mouseout(d) {
                path.attr("opacity", 1);
                tooltip.style("display", "none");
            }
            
            function mousemove(d) {
                tooltip.style("left", d3.event.layerX + 20 + "px")
                    .style("top", d3.event.layerY - 30 + "px");
            }

            function clickSegment(d) {
                
                // Si l'utilisateur n'a jamais cliqué sur le pieChart auparavant
                if (firstTime === true) {
                    firstTime = false;

                    outerRadius = Math.min(conf.pieChart.width, conf.pieChart.height) / 2;
                    innerRadius = outerRadius * conf.pieChart.ratioRadius;
                    
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
                    _colors = "",
                    _pieChart_TranslateX = 0,
                    _pieChart_TranslateY = 0,
                    _barChart_TranslateX = 0,
                    _barChart_TranslateY = 0,
                    _info_TranslateX = 0,
                    _info_TranslateY = 0
                
                switch (d.data.label) {
                    case "ROUTE":
                        _dataSet = dataSet[0];
                        _colors = colors[0];
                        _pieChart_TranslateX = conf.pieChart.route.translateX;
                        _pieChart_TranslateY = conf.pieChart.route.translateY;
                        _barChart_TranslateX = conf.barChart.route.translateX;
                        _barChart_TranslateY = conf.barChart.route.translateY;
                        _info_TranslateX = conf.info.route.translateX;
                        _info_TranslateY = conf.info.route.translateY;
                        break;
                    case "VTT":
                        _dataSet = dataSet[1];
                        _colors = colors[1];
                        _pieChart_TranslateX = conf.pieChart.vtt.translateX;
                        _pieChart_TranslateY = conf.pieChart.vtt.translateY;
                        _barChart_TranslateX = conf.barChart.vtt.translateX;
                        _barChart_TranslateY = conf.barChart.vtt.translateY;
                        _info_TranslateX = conf.info.vtt.translateX;
                        _info_TranslateY = conf.info.vtt.translateY;
                        break;
                    case "BMX":
                        _dataSet = dataSet[2];
                        _colors = colors[2];
                        _pieChart_TranslateX = conf.pieChart.bmx.translateX;
                        _pieChart_TranslateY = conf.pieChart.bmx.translateY;
                        _barChart_TranslateX = conf.barChart.bmx.translateX;
                        _barChart_TranslateY = conf.barChart.bmx.translateY;
                        _info_TranslateX = conf.info.bmx.translateX;
                        _info_TranslateY = conf.info.bmx.translateY;
                        break;
                    default:
                        alert("Label inconnu");
                }
                
                // Mise à jour du jeu de données
                hist.update(_dataSet);
                
                // Mise à jour des couleurs
                info.style("fill", _colors[0]);
                
                pieChartTextCenter.transition()
                    .duration(conf.info.duration)
                    .delay(conf.info.delay)
                    .style("fill", _colors[0])
                    .text(_dataSet.label);
                
                // On met à jour les labels contenant les informations (somme des licenciés) sur l'activité sélectionnée
                labelNombre.transition()
                    .duration(conf.info.duration)
                    .delay(conf.info.delay)
                    .tween("text", function(d) {
                        var i = d3.interpolate(this.textContent,
                                               (_dataSet.men.reduce(function(a, b) { return a + b.y; }, 0))
                                               + (_dataSet.women.reduce(function(a, b) { return a + b.y; }, 0)));
                        return function(t) {
                            this.textContent = Math.round(i(t));
                        }
                    });

                legend.transition()
                    .duration(conf.info.duration)
                    .delay(conf.info.delay)
                    .style("fill", function(d, i) { return _colors.reverse()[0]; });
                
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
                info.transition()
                    .duration(conf.info.duration + 1000)
                    .delay(conf.info.delay + 1000)
                    .attr("transform", "translate(" + _info_TranslateX + "," + _info_TranslateY + ")")
                    .style("visibility", "visible");
            }
        }


        /*  **************************************************  */
        /*                      BarChart                        */
        /*  **************************************************  */
        function histogram(id, datas) {
            
            var tooltip = d3.select('#dataviz2')
                .append('div')
                .attr('class', 'tooltipBarChart');

            tooltip.append('div')
                .attr('class', 'tooltipBarChart_sexe');
            
            tooltip.append('div')
                .attr('class', 'tooltipBarChart_label');

            tooltip.append('div')
                .attr('class', 'tooltipBarChart_value');
            
            var hist = {};
            
            var stackedData = [];
            stackedData.push(datas.men);
            stackedData.push(datas.women);
            
            var stack = d3.layout.stack();
            var layers = stack(stackedData);
            var yStackMax = d3.max(layers, function(layer, i) {
                return d3.max(layer, function(d, j) {
                    return d.y0 + d.y;
                });
            });

            var margin = {top: 20, right: 20, bottom: 200, left: 80},
                width = 500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], 0.1)
                .domain(datas.men.map(function(d) { return d.label; }));
            
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
            
            var rect = layer.selectAll("rect")
                .data(function(d) { return d; })
                .enter().append("rect")
                .attr("x", function(d) { return x(d.label); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.y0 + d.y); })
                .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("mousemove", mousemove);
            
            var text = hist.g.append("g");
            
            text.selectAll("text")
                .data(datas.all)
                .enter()
                .append("text")
                .text(function(d) { return d3.format(",")(d.y); })
                .attr("x", function(d) { return x(d.label)+x.rangeBand()/2; })
                .attr("y", function(d) { return y(d.y)-5; })
                .attr("text-anchor", "middle")
                .style("fill", "#494949");
            
            function mouseover(d, i) {
                rect.attr("opacity", 0.5);
                d3.select(this).attr("opacity", 1);
                tooltip.select(".tooltipBarChart_sexe").html("Sexe : " + d.sexe);
                tooltip.select(".tooltipBarChart_label").html("Catégorie : " + d.label);
                tooltip.select(".tooltipBarChart_value").html(d.y + " licencié(s)");
                tooltip.style("display", "block");
            }

            function mouseout(d) {
                rect.attr("opacity", 1);
                tooltip.style("display", "none");
            }
            
            function mousemove(d) {
                tooltip.style("left", d3.event.layerX + 20 + "px")
                    .style("top", d3.event.layerY - 30  + "px");
            }

            hist.update = function(datas) {

                var stackedData = [];
                stackedData.push(datas.men);
                stackedData.push(datas.women);

                var stack = d3.layout.stack();
                var layers = stack(stackedData);
                var yStackMax = d3.max(layers, function(layer) {
                    return d3.max(layer, function(d) {
                        return d.y0 + d.y;
                    });
                });
                
                y.domain([0, yStackMax]);
                layer = hist.g.selectAll(".layer").data(layers)
                    .style("fill", function(d, i) { return datas.colors[i]; });
                
                layer.selectAll("rect").data(function(d) { return d; })
                .transition()
                    .duration(500)
                    .attr("y", function(d) {
                            return y(d.y0 + d.y);
                    })
                    .attr("height", function(d) {
                        return y(d.y0) - y(d.y0 + d.y); });
                
                text.selectAll("text").data(datas.all)
                    .transition()
                    .duration(500)
                        .delay(0)
                        .tween("text", function(d) {
                            var i = d3.interpolate(this.textContent, d.y);
                            return function(t) {
                                this.textContent = Math.round(i(t));
                            }
                    })
                    .attr("y", function(d) { return y(d.y)-5; });
            }

            return hist;
        }
    });
});