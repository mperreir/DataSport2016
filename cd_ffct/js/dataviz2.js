"use strict";

d3.json("json/evolution_licences_par_activites_et_categories_test.json", function(error, json) {
    
    // Si on a une erreur
    if (error) { throw error; }
    
    
    /*  **************************************************  */
    /*                      Initialisation                  */
    /*  **************************************************  */
    var dataviz2 = d3.select("#dataviz2");
    
    // Création du titre
    dataviz2.append("h1").text("Découvrez alors comment se répartissent les niveaux et catégories en fonction de 3 grandes pratiques");
    
    // Création des div qui contiendront le pieChart et le barChart
    var divPieChart = dataviz2.append("div").attr("id", "pieChart");
    var divBarChart = dataviz2.append("div").attr("id", "barChart");
    
    // Booléen qui permet de savoir si l'on a déjà cliqué sur le pieChart
    var firstClick = false;

    // On créé un objet vide pour l'histogramme.
    // Lors du premier clique sur le pieChart, l'histogramme sera créé
    var hist = {};
    
    // Couleurs par défaut
    var colors = ["#9BC8D9", "#F56D34", "#F4DC78"];
    var colorsHover = ["#6B98A9", "#C53D04", "#C4AC48"];
    
    
    /*  **************************************************  */
    /*                      Dataset                         */
    /*  **************************************************  */
    var dataSet = json.children;
    
    var initPieChart = [];
    // Pour chaque type d'activité (Route, VTT, BMX)
    for (var i = 0; i < dataSet.length; i++) {
        var data = {};
        data.label = dataSet[i].label;
        // Calcul de la valeur associée à l'activité (somme des licenciés des différentes catégories)
        data.value = dataSet[i].children.reduce(function(a, b) { return a + b.value;}, 0);
        data.color = colors[i];
        data.colorHover = colorsHover[i];
        
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
    
    // Div contenant des informations lorsque l'utilisateur clique sur un quartier du pieChart
    var divInfo = dataviz2.append("div")
        .attr("id", "divInfo")
        .style("margin-top:", "159px")
        .style("margin-left:", "591px")
        .style("font-family", "source sans pro")
        .style("text-transform", "uppercase")
        .style("display", "inline-block");
    
    var labelNombre = divInfo.append("p")
        .style("margin", "0")
        .style("padding", "0")
        .style("font-size", "48px");
    
    var labelTexte = divInfo.append("p")
        .style("margin", "0")
        .style("padding", "0")
        .style("font-size", "29px");
    
    
    
    /*  **************************************************  */
    /*                      PieChart                        */
    /*  **************************************************  */
    function pieChart(id, data) {
        var width = 329,
            height = 329,
            radius = Math.min(width, height) / 2;
        
        var arc = d3.svg.arc()
            .innerRadius(radius - 80)
            .outerRadius(radius);
        
        var arcClicked = d3.svg.arc()
            .innerRadius(radius - 60)
            .outerRadius(radius + 20);
        
        var arcClickedMin = d3.svg.arc()
            .innerRadius((radius - 60) / 2)
            .outerRadius((radius + 20) / 2);
        
        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.value; });
        
        var svg = d3.select(id).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width /2 + "," + height / 2 + ")");
        
        var g = svg.selectAll(".arc")
            .data(pie(initPieChart))
            .enter()
            .append("g")
                .attr("class", "arc");
        
        var path = g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return d.data.color; })
            .on("mouseover", function(d) {
                d3.select(this).style("fill", d.data.colorHover);
            })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", d.data.color)
            })
            .on("click", function(d) {
                if (firstClick === false) {
                    $(svg).trigger("clickSegment");
                    pieChartText.attr("transform", function(d) { console.log(d);return "translate(" + arc.centroid(d) + ")"; })
                }
                clickSegment(d);
            })
            .each(function(d) { this._current = d; });
        
        var pieChartText = g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .text(function(d) { return d.data.label; });
        
        $(svg).bind("clickSegment", function(event) {            
            path.transition().duration(500).attrTween("d", function(a) {
                var i = d3.interpolate(this._current, a),
                    k = d3.interpolate(arc.outerRadius()(), radius / 2);
                this._current = i(0);
                return function(t) {
                    return arc.innerRadius(k(t)/2).outerRadius(k(t))(i(t));
                }
            });
        });
        
        function clickSegment(d) {
            // Si l'utilisateur n'a jamais cliqué sur le pieChart auparavant
            if (firstClick === false) {
                firstClick = true;
                hist = histogram("#barChart", initBarChart);
                divPieChart.style("display", "inline-block");
                divBarChart.style("display", "inline-block");
            }

            switch (d.data.label) {
                case "Route":
                    // On met à jour les données de l'histogramme et ses couleurs
                    hist.update(dataSet[0].children, colors[0], colorsHover[0]);
                    // On met à jour la couleur de la police de la div contenant les informations sur l'activité sélectionnée
                    divInfo.style("color", colors[0]);
                    // On met à jour les labels contenant les informations (somme des licenciés) sur l'activité sélectionnée
                    labelNombre.text(dataSet[0].children.reduce(function(a, b) { return a + b.value;}, 0));
                    labelTexte.text("licenciés");

                    break;

                case "VTT":
                    // On met à jour les données de l'histogramme et ses couleurs
                    hist.update(dataSet[1].children, colors[1], colorsHover[1]);
                    // On met à jour la couleur de la police de la div contenant les informations sur l'activité sélectionnée
                    divInfo.style("color", colors[1]);
                    // On met à jour les labels contenant les informations (somme des licenciés) sur l'activité sélectionnée
                    labelNombre.text(dataSet[1].children.reduce(function(a, b) { return a + b.value;}, 0));
                    labelTexte.text("licenciés");
                    break;

                case "BMX":
                    // On met à jour les données de l'histogramme et ses couleurs
                    hist.update(dataSet[2].children, colors[2], colorsHover[2]);
                    // On met à jour la couleur de la police de la div contenant les informations sur l'activité sélectionnée
                    divInfo.style("color", colors[2]);
                    // On met à jour les labels contenant les informations (somme des licenciés) sur l'activité sélectionnée
                    labelNombre.text(dataSet[2].children.reduce(function(a, b) { return a + b.value;}, 0));
                    labelTexte.text("licenciés");

                    break;

                default:
                    //alert("label inconnu");
            }
        }
        
        
    }
    
    pieChart("#pieChart", initPieChart);
    
    
    /*  **************************************************  */
    /*                      BarChart                        */
    /*  **************************************************  */
    function histogram(id, datas) {
        
        var hist = {};
        
        var histColor = "",
            histColorHover = "";
        
        var margin = {top: 20, right: 20, bottom: 200, left: 80},
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        
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
            d3.select(this).attr("fill", histColorHover);
        }
        
        function mouseout(d) {
            d3.select(this).attr("fill", histColor);
        }
        
        hist.update = function(datas, color, colorHover) {
            // Mise à jour des couleurs
            histColor = color;
            histColorHover = colorHover;
            
            // Mise à jour du domaine des valeurs de l'histogramme
            y.domain([0, d3.max(datas, function(d) { return d.value; })]);
            
            // Mise à jour des valeurs de l'histogramme
            var bars = svg.selectAll(".bar").data(datas);
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", histColor);
            
            // Mise à jour du texte des bars de l'histogramme
            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d.value)})
                .attr("y", function(d) {return y(d.value)-5; });
        }
        
        return hist;
    }
});