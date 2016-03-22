var d3 = window.d3,
    selectedDataBoat,
    selectedElementBoat,
    selectedDataMap,
    selectedElementMap;

var boatPoints = [
    {
        key: "point_quille",
        name: "Quille",
        nb: 8,
        data: "La quille d’un bateau correspond à la partie inférieure de la coque. C’est le véritable casse-\
tête des constructeurs puisque cet équipement pèse 30% du poids total du bateau. Il est fréquent qu'elle soit endommagée\
 par des objets flottants."
    },
    {
        key: "point_cabine",
        name: "Raisons médicales",
        nb: 3,
        data: "Guy Bernardin a dû abandonner la course à cause d'une rage de dent en 1990. En 2008 Yann Eliès a été \
victime d’une fracture du fémur, ce qui l’a contraint à arrêter la course."
    },
    {
        key: "point_mat",
        name: "Dématage",
        nb: 11,
        data: ""
    },
    {
        key: "point_safran",
        name: "Safran",
        nb: 7,
        data: "Le safran est une partie immergée du gouvernail d’un bateau."
    },
    {
        key: "point_greement",
        name: "Chavirage / retournement",
        nb: 8,
        data: ""
    }

];

var mapPoints = [
    {
        key: "golf_gascogne",
        name: "Golf de Gascogne",
        nb: 5,
        data: "Décès du skipper<br/>Dématages<br/>Problèmes techniques"
    },
    {
        key: "sables_olonne",
        name: "Sables d'Olonne",
        nb: 2,
        data: "Délaminage<br/>Manque de préparation"
    },
    {
        key: "cap_leeuwin",
        name: "Cap Leeuwin",
        nb: 2,
        data: "Dématage<br/>Accident corporel"
    },
    {
        key: "cap_bonne_esperence",
        name: "Cap de Bonne Espérance",
        nb: 2,
        data: "Bome arraché<br/>Quille détruite"
    },
    {
        key: "new_zealand",
        name: "Nouvelle Zélande",
        nb: 4,
        data: "Avarie<br/>Problème de quille<br/>Problème de grand voile<br/>Assistance reçue"
    }
];

function hightlightBoat(element) {
    element.style("cursor", "pointer").style("opacity", 1);
    
}

function offlightBoat(point, element, change) {
    
    element.style("cursor", "auto");
    
    if (change || selectedDataBoat !== point) {
        element.style("opacity", 0.7);
    }
    
}

function clickBoat(point, element) {
    
    if (selectedElementBoat) {
        offlightBoat(selectedDataBoat, selectedElementBoat, true);
    }
    
    selectedElementBoat = element;
    selectedDataBoat = point;
    hightlightBoat(element);
    
    d3.select("#pieges_boat_name").text(point.name);
    d3.select("#pieges_boat_abandons_number").text(point.nb);
    d3.select("#pieges_boat_text").text(point.data);
    
}

function hightlightMap(element) {
    element.style("cursor", "pointer").style("opacity", 1);
}

function offlightMap(point, element, change) {
    
    element.style("cursor", "auto");
    
    if (change || selectedDataMap !== point) {
        element.style("opacity", 0.7);
    }
    
}

function clickMap(point, element) {
    
    if (selectedElementMap) {
        offlightMap(selectedDataMap, selectedElementMap, true);
    }
    
    selectedElementMap = element;
    selectedDataMap = point;
    hightlightMap(element);
    
    d3.select("#pieges_map_point_name").text(point.name);
    d3.select("#pieges_map_abandons_number").text(point.nb);
    d3.select("#pieges_map_abandons_list").html(point.data);
    
}

function animateBoat() {
    
    var boat = d3.select(document.getElementById("pieges_boat_boat").contentDocument);
    
    boat.select("#bateau")
        .attr("transform", "translate(-150, 0)")
        .transition()
        .ease("bounce")
        .duration(800)
        .attr("transform", "translate(0, 0)");
            
    boat.selectAll("circle").each(function(a, index, c) {
        var circle = d3.select(this);
        var r = circle.attr("r");
        circle.attr("r", 0)
            .transition()
            .ease("bounce")
            .delay(400 + index * 100)
            .duration(800)
            .attr("r", r);
    });

    d3.select("#pieges_boat_boat").style("visibility", "visible");
    
}

function animateMap() {
    
    var map = d3.select(document.getElementById("pieges_map_map").contentDocument);
    
    map.selectAll("path")
        .attr("opacity", 0)
        .transition()
        .duration(400)
        .attr("opacity", 1);
    
    map.selectAll("circle").each(function(a, index, c) {
        var circle = d3.select(this);
        var r = circle.attr("r");
        circle.attr("r", 0)
            .transition()
            .ease("bounce")
            .delay(400 + index * 100)
            .duration(800)
            .attr("r", r);
    });

    d3.select("#pieges_map_map").style("visibility", "visible");
    
}

module.exports = exports = function() {
    boatPoints.forEach(function(point) {
        var element = d3.select(document.getElementById("pieges_boat_boat").contentDocument).select("#" + point.key);

        element.on("mouseenter", function() {
            hightlightBoat(element);
        });
        element.on("mouseleave", function() {
            offlightBoat(point, element);
        });
        element.on("click", function() {
            clickBoat(point, element);
        });
        
        element.style("transition", "opacity 0.5s");
        
    });
    
    mapPoints.forEach(function(point) {
        var element = d3.select(document.getElementById("pieges_map_map").contentDocument).select("#" + point.key);

        element.on("mouseenter", function() {
            hightlightMap(element);
        });
        element.on("mouseleave", function() {
            offlightMap(point, element);
        });
        element.on("click", function() {
            clickMap(point, element);
        });
        
        element.style("transition", "opacity 0.5s");
        
    });
    
    clickBoat(boatPoints[2], d3.select(document.getElementById("pieges_boat_boat").contentDocument).select("#point_mat"));
    clickMap(mapPoints[2], d3.select(document.getElementById("pieges_map_map").contentDocument).select("#cap_leeuwin"));
    
    animateBoat();
    animateMap();
    
};