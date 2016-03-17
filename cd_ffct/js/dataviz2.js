"use strict";

$(document).ready(function() {
    d3.json("json/evolution_licences_par_activites_et_categories_test.json", function(error, json) {
        
        if (error) { throw error; }
        
        var colors = [
            ["#9BC8D9", "#C3D8E7"],
            ["#F56D34", "#FFA574"],
            ["#F4DC78", "#EFDF90"]
        ];
        
        
        
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
        
        // DataSet pour initialiser les valeurs de l'histogramme à 0 afin d'avoir une animation lors d'une premier clique
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
        /*                      Configuration                   */
        /*  **************************************************  */
        var conf = {
            general: {
                opacity: 0.5,
                tooltipX: 20,
                tooltipY: -30
            },
            piechart: {
                // Initialisation
                init: {
                    width: 329,
                    height: 329,
                    translateX: ($("#dataviz2").width() / 2),
                    translateY: ($("#dataviz2").height() / 2)
                },
                
                // General
                ratioRadius: (40 / 100),
                lengthOpen: 20,
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
                transition: {
                    reduction : {
                        duration: 1000,
                        delay: 0
                    },
                    animation: {
                        duration: 1000,
                        delay: 0
                    },
                    move: {
                        duration: 1000,
                        delay: 0
                    }
                }
            },
            barchart: {
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
                transition: {
                    animation: {
                        duration: 1000,
                        delay: 0
                    },
                    hide: {
                        duration: 1000,
                        delay: 0
                    },
                    move: {
                        duration: 0,
                        delay: 0
                    }
                }
            },
            info: {
                init: {
                    translateX: $("#dataviz2").width() / 2,
                    translateY: 120
                },
                
                // Activités
                route: {
                    translateX: 650,
                    translateY: 120
                },
                vtt: {
                    translateX: 0,
                    translateY: 120
                },
                bmx: {
                    translateX: 0,
                    translateY: 120
                },
                
                transition: {
                    animation: {
                        duration: 1000,
                        delay: 0
                    },
                    move: {
                        duration: 1000,
                        delay: 0
                    },
                    hide: {
                        duration: 1000,
                        delay: 0
                    }
                }
            },
            infoClick: {
                translateX: 650,
                translateY: 200
            },
            source: {
                translateX: 650,
                translateY: 430
            }
        }


        

        /*  **************************************************  */
        /*                      Initialisation                  */
        /*  **************************************************  */
        // Booléen qui permet de savoir si l'on a déjà cliqué sur le pieChart
        var firstTime = true;
        
        var dataviz = d3.select("#dataviz2"),
            datavizWidth = $("#dataviz2").width(),
            datavizHeight = $("#dataviz2").height();
        
        // Création du titre
        dataviz.append("h1").text("Découvrez alors comment se répartissent les niveaux et catégories en fonction de 3 grandes pratiques");
        
        // Création du svg
        var svg = dataviz.append("svg")
                .attr("width", datavizWidth)
                .attr("height", (datavizHeight - $("#dataviz2 h1").height()) - parseInt($("#dataviz2 h1").css("marginBottom")) + "px");

        pieChart(dataviz);

        // Div contenant des informations lorsque l'utilisateur clique sur un quartier du pieChart
        var info = svg.append("g")
            .attr("id", "info")
            .attr("transform", "translate(" + conf.info.init.translateX + "," + conf.info.init.translateY + ")");

        var labelTitre = info.append("text")
            .style("font-size", "48px")
            .style("font-style", "bold");
        
        var labelNombre = info.append("text")
            .style("font-size", "48px")
            .attr("y", 100)
            .text("0");

        var labelTexte = info.append("text")
            .style("font-size", "29px")
            .attr("y", 125)
            .text("licenciés");
        
        var colorsInit = ["#000000", "#000000"];
        var legend = info.selectAll(".legend")
            .data(colorsInit)
            .enter()
                .append("g")
                .attr("class", "legend")
                .attr("transform", function(d, m) { return "translate(0," + (m * (25 + 7) + 150) + ")"; });
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
        
        
        // Div qui indique qu'il faut cliquer sur le piechart
        var infoClick = svg.append("g")
            .attr("id", "infoClick")
            .style("text-anchor", "start")
            .attr("transform", "translate(" + conf.infoClick.translateX + "," + conf.infoClick.translateY + ")");
        infoClick.append("text")
            .text("Cliquez sur une activité");
        infoClick.append("text")
            .attr("y", 25)
            .text("pour visualiser");
        infoClick.append("text")
            .attr("y", 50)
            .text("les différentes catégories");
        
        
        // Div pour les sources des données
        var source = svg.append("g")
            .attr("id", "source")
            .style("font-style", "italic")
            .style("fill", "#494949")
            .attr("transform", "translate(" + conf.source.translateX + "," + conf.source.translateY + ")");
        source.append("text")
            .style("font-size", "15px")
            .text("Valeurs de 2015");
        source.append("text")
            .style("font-size", "15px")
            .attr("y", 20)
            .text("en Loire-Atlantique");
        
        
        // On cache le barchart et la légende à l'initialisation
        d3.select("#barChart").style("visibility", "hidden");
        info.style("visibility", "hidden");

        
        
        /*  **************************************************  */
        /*                      PieChart                        */
        /*  **************************************************  */    
        function pieChart(dataviz) {
            
            var hist = histogram(dataviz, dataSet_barChartInit);
            
            var tooltip = dataviz.append('div')
                .attr('class', 'tooltipPieChart');

            tooltip.append('div')
                .attr('class', 'tooltipPieChart_label');

            tooltip.append('div')
                .attr('class', 'tooltipPieChart_value');
            
            var outerRadius = Math.min(conf.piechart.init.width, conf.piechart.init.height) / 2,
                innerRadius = outerRadius * conf.piechart.ratioRadius;
            
            var arc = d3.svg.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);
            
            var arcOpen = d3.svg.arc()
                .outerRadius(Math.min(conf.piechart.width, conf.piechart.height) / 2 + conf.piechart.lengthOpen)
                .innerRadius((Math.min(conf.piechart.width, conf.piechart.height) / 2) * conf.piechart.ratioRadius + conf.piechart.lengthOpen);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.sum; });

            var g = svg.append("g")
                .attr("id", "pieChart")
                .attr("transform", "translate(" + conf.piechart.init.translateX + "," + conf.piechart.init.translateY + ")");

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
                .on("mouseover", mouseoverLabel)
                .on("mouseout", mouseout)
                .on("click", clickSegment);

            function mouseoverLabel(d) {
                /*
                    FAIRE AVEC (d, i)  + if-else
                */
                path.attr("opacity", conf.general.opacity);
                d3.select(this.previousSibling).attr("opacity", 1);
                tooltip.select(".tooltipPieChart_label").html(d.data.label);
                tooltip.select(".tooltipPieChart_value").html(d.data.sum + " licencié(s)");
                tooltip.style("display", "block");
            }
            
            function mouseover(d) {
                /*
                    FAIRE AVEC (d, i)  + if-else
                */
                path.attr("opacity", conf.general.opacity);
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
                tooltip.style("left", d3.event.layerX + conf.general.tooltipX + "px")
                    .style("top", d3.event.layerY + conf.general.tooltipY + "px");
            }

            function clickSegment(d) {
                
                // Si l'utilisateur n'a jamais cliqué sur le pieChart auparavant
                if (firstTime === true) {
                    firstTime = false;

                    outerRadius = Math.min(conf.piechart.width, conf.piechart.height) / 2;
                    innerRadius = outerRadius * conf.piechart.ratioRadius;
                    
                    // Réduction du piechart
                    path.transition()
                        .duration(conf.piechart.transition.reduction.duration)
                        .delay(conf.piechart.transition.reduction.delay)
                        .attrTween("d", function(angle) {
                            var outer = d3.interpolate(arc.outerRadius()(), outerRadius);
                            var inner = d3.interpolate(arc.innerRadius()(), innerRadius);
                            var i = d3.interpolate(angle.startAngle + 0.1, angle.endAngle);
                            return function(t) {
                                angle.endAngle = i(t);
                                var arcTemp = arc.innerRadius(inner(t)).outerRadius(outer(t))(angle);
                                // Mise à jour des positions des labels
                                pieChartText.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                                    .attr("dy", ".35em");
                                return arcTemp;
                            }
                        });
                    
                    infoClick.style("display", "none");
                } else {
                    path.transition()
                        .duration(conf.piechart.transition.reduction.duration)
                        .delay(conf.piechart.transition.reduction.delay)
                        .attrTween("d", function(angle) {
                            var outer = d3.interpolate(arc.outerRadius()(), arc.outerRadius()());
                            var inner = d3.interpolate(arc.innerRadius()(), arc.innerRadius()());
                            var i = d3.interpolate(angle.startAngle + 0.1, angle.endAngle);
                            return function(t) {
                                angle.endAngle = i(t);
                                return arc(angle);
                            }
                        });
                }
                /*
                d3.select("#barChart").transition()
                    .duration(conf.barchart.transition.hide.duration)
                    .delay(conf.barchart.transition.hide.delay)
                    .style("visibility", "hidden");
                
                info.transition()
                    .duration(conf.info.transition.hide.duration)
                    .delay(conf.info.transition.hide.delay)
                    .style("visibility", "hidden");
                */
                
                // Ouverture de l'arc
                if (this.previousSibling == null) {
                    d3.select(this).transition()
                        .duration(conf.piechart.transition.animation.duration)
                        .delay(conf.piechart.transition.animation.delay)
                        .attr("d", arcOpen);
                } else {
                    d3.select(this.previousSibling).transition()
                        .duration(conf.piechart.transition.animation.duration)
                        .delay(conf.piechart.transition.animation.delay)
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
                        _pieChart_TranslateX = conf.piechart.route.translateX;
                        _pieChart_TranslateY = conf.piechart.route.translateY;
                        _barChart_TranslateX = conf.barchart.route.translateX;
                        _barChart_TranslateY = conf.barchart.route.translateY;
                        _info_TranslateX = conf.info.route.translateX;
                        _info_TranslateY = conf.info.route.translateY;
                        break;
                    case "VTT":
                        _dataSet = dataSet[1];
                        _colors = colors[1];
                        _pieChart_TranslateX = conf.piechart.vtt.translateX;
                        _pieChart_TranslateY = conf.piechart.vtt.translateY;
                        _barChart_TranslateX = conf.barchart.vtt.translateX;
                        _barChart_TranslateY = conf.barchart.vtt.translateY;
                        _info_TranslateX = conf.info.vtt.translateX;
                        _info_TranslateY = conf.info.vtt.translateY;
                        break;
                    case "BMX":
                        _dataSet = dataSet[2];
                        _colors = colors[2];
                        _pieChart_TranslateX = conf.piechart.bmx.translateX;
                        _pieChart_TranslateY = conf.piechart.bmx.translateY;
                        _barChart_TranslateX = conf.barchart.bmx.translateX;
                        _barChart_TranslateY = conf.barchart.bmx.translateY;
                        _info_TranslateX = conf.info.bmx.translateX;
                        _info_TranslateY = conf.info.bmx.translateY;
                        break;
                    default:
                        alert("Label inconnu");
                }
                
                // Mise à jour du jeu de données
                hist.update(_dataSet);
                
                // Mise à jour des couleurs
                
                /*info.transition()
                    .duration(conf.info.transition.animation.duration)
                    .delay(conf.info.transition.animation.delay)
                    .style("fill", function(d, i) { return _colors.reverse()[0]; });*/
                info.style("fill", _colors[0]);
                
                labelTitre.transition()
                    .duration(conf.info.transition.animation.duration)
                    .delay(conf.info.transition.animation.delay)
                    .text(_dataSet.label)
                
                // On met à jour les labels contenant les informations (somme des licenciés) sur l'activité sélectionnée
                labelNombre.transition()
                    .duration(conf.info.transition.animation.duration)
                    .delay(conf.info.transition.animation.delay)
                    .tween("text", function(d) {
                        var i = d3.interpolate(this.textContent,
                                               (_dataSet.men.reduce(function(a, b) { return a + b.y; }, 0))
                                               + (_dataSet.women.reduce(function(a, b) { return a + b.y; }, 0)));
                        return function(t) {
                            this.textContent = Math.round(i(t));
                        }
                    });

                /*legend.transition()
                    .duration(conf.info.transition.animation.duration)
                    .delay(conf.info.transition.animation.delay)
                    .style("fill", function(d, i) { return _colors.reverse()[0]; });*/
                legend.style("fill", function(d, i) { return _colors.reverse()[0]; });
                
                // Transition pour le déplacement du pieChart
                g.transition()
                    .duration(conf.piechart.transition.move.duration)
                    .delay(conf.piechart.transition.move.delay)
                    .attr("transform", "translate(" + _pieChart_TranslateX + "," + _pieChart_TranslateY + ")");
                
                // Transition pour le déplacement du barChart
                hist.g.transition()
                    .duration(conf.barchart.transition.move.duration)
                    .delay(conf.barchart.transition.move.delay)
                    .attr("transform", "translate(" + _barChart_TranslateX + "," + _barChart_TranslateY + ")")
                    .style("visibility", "visible");
                
                // Transition pour le déplacement de la légende
                info.transition()
                    .duration(conf.info.transition.move.duration)
                    .delay(conf.info.transition.move.delay)
                    .attr("transform", "translate(" + _info_TranslateX + "," + _info_TranslateY + ")")
                    .style("visibility", "visible");
            }
        }


        /*  **************************************************  */
        /*                      BarChart                        */
        /*  **************************************************  */
        function histogram(dataviz, datas) {
            
            var tooltip = dataviz.append('div')
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
                rect.attr("opacity", conf.general.opacity);
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
                tooltip.style("left", d3.event.layerX + conf.general.tooltipX + "px")
                    .style("top", d3.event.layerY + conf.general.tooltipY  + "px");
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
                    .duration(conf.barchart.transition.animation.duration)
                    .delay(conf.barchart.transition.animation.delay)
                    .attr("y", function(d) {
                            return y(d.y0 + d.y);
                    })
                    .attr("height", function(d) {
                        return y(d.y0) - y(d.y0 + d.y); });
                
                text.selectAll("text").data(datas.all)
                    .transition()
                    .duration(conf.barchart.transition.animation.duration)
                    .delay(conf.barchart.transition.animation.delay)
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