var d3 = window.d3,
    RadialProgressChart = require("../utils/radialChart.js"),
    selectedData;
    
var colors = [
    {
        solid: "#0281fc",
    },
    {
        solid: "#0063be",
    },
    {
        solid: "#013667",
    },
    {
        solid: "#00213f",
    },
    {
        solid: "rgba(0,0,0,0)",
    }
];

var series = {
    sexe: [
        {
            labelStart: "",
            labelGap: 0,
            value: 0,
            color: colors[4]
        },
        {
            labelStart: "",
            labelGap: 0,
            value: 0,
            color: colors[4]
        },
        {
            labelStart: 'Homme',
            labelGap: 90,
            value: 97,
            color: colors[0]
        },
        {
            labelStart: 'Femme',
            labelGap: 85,
            value: 3,
            color: colors[2]
        }
    ],
    age: [
        {
            labelStart: '18-30',
            labelGap: 63,
            value: 7,
            color: colors[3]
        },
        {
            labelStart: '31-40',
            labelGap: 63,
            value: 51,
            color: colors[2]
        },
        {
            labelStart: '41-50',
            labelGap: 63,
            value: 32,
            color: colors[1]
        },
        {
            labelStart: '51+',
            labelGap: 44,
            value: 10,
            color: colors[0]
        }
    ],
    experience: [
        {
            labelStart: '4',
            labelGap: 20,
            value: 5,
            color: colors[3]
        },
        {
            labelStart: '3',
            labelGap: 20,
            value: 12,
            color: colors[2]
        },
        {
            labelStart: '2',
            labelGap: 20,
            value: 28,
            color: colors[1]
        },
        {
            labelStart: '1',
            labelGap: 20,
            value: 55,
            color: colors[0]
        }
    ],
    nationalite: [
        {
            labelStart: 'France',
            labelGap: 74,
            value: 62,
            color: colors[3]
        },
        {
            labelStart: 'Royaume-Uni',
            labelGap: 144,
            value: 14,
            color: colors[2]
        },
        {
            labelStart: 'Suisse',
            labelGap: 70,
            value: 5,
            color: colors[1]
        },
        {
            labelStart: 'Autres',
            labelGap: 70,
            value: 18,
            color: colors[0]
        }
    ]
};

var selects = {
    sexe: function() {
        return [
            d3.select(document.getElementById("skipper_skipper").contentDocument).select("#head"),
            d3.select("#skipper_sexe")
        ];  
    },
    experience: function() {
        return [
            d3.select(document.getElementById("skipper_skipper").contentDocument).select("#legs").selectAll("path"),
            d3.select("#skipper_experience")
        ];
    },
    nationalite: function() {
        return [
            d3.select(document.getElementById("skipper_skipper").contentDocument).select("#body"),
            d3.select("#skipper_nat")
        ];
    },
    age: function() {
        return [
            d3.select(document.getElementById("skipper_skipper").contentDocument).select("#arms").selectAll("path"),
            d3.select("#skipper_age")
        ];
    }
};

function highlight(elements) {
    elements().forEach(function(e) {
        e.style("fill", "#be1522").style("color", "#be1522").style("cursor", "pointer");
    });
}

function offlight(elements, s, change) {
    if (change || selectedData !== s) {
        elements().forEach(function(e) {
            e.style("fill", "#2c4c7d").style("color", "#2c4c7d").style("cursor", "auto");
        });
    }
}

function display(elements, s) {
   
    selectedData = s;

    createNewChart(series[s]);

    $.each(selects, function(os, osv) {
        offlight(osv, os, true);
    });
    
    highlight(elements);
    
}

function hover(item) {
    if (item.value) {
        d3.select('.rbc-center-text').text(item.value + "%");
    }
}

function leave(item) {
    if (item.value) {
        d3.select('.rbc-center-text').text("");
    }
}

function createNewChart(serie) {
    
    d3.select("#skipper_radial").select("svg").remove();
    
    new RadialProgressChart('#skipper_radial', {
        diameter: window.innerWidth / 9.5,
        shadow: {
            width: 0
        },
        stroke: {
            width: 10,
            gap: 18
        },
        round: false,
        center: function(value, index, item) {
            return item.value;
        },
        animation: {
            duration: 1000
        },
        series: serie,
        hover: hover,
        leave: leave
    });
    
}

function animateSkipper() {
    
    var skipp = d3.select(document.getElementById("skipper_skipper").contentDocument);
    skipp.select("#head")
    .attr("transform", "translate(0, -60)")
    .transition()
    .ease("bounce")
    .delay(800)
    .duration(1000)
    .attr("transform", "translate(0, 0)");
    
    skipp.select("#arms")
    .attr("transform", "translate(0, 180)")
    .transition()
    .delay(0)
    .ease("sin")
    .duration(500)
    .attr("transform", "translate(0, 0)");

    skipp.select("#legs")
    .attr("transform", "translate(0, 150)")
    .transition()
    .delay(500)
    .ease("sin")
    .duration(500)
    .attr("transform", "translate(0, 0)");
    
    skipp.select("#body")
    .attr("transform", "translate(0, -160)")
    .transition()
    .ease("sin")
    .duration(500)
    .attr("transform", "translate(0, 0)");
    
    animateText("#skipper_sexe");
    animateText("#skipper_age");
    animateText("#skipper_nat");
    animateText("#skipper_experience");
    
    d3.select("#skipper_skipper").style("visibility", "visible");
    
}

function appText(selector) {
    d3.select(selector)
        
}

function animateText(element, text) {
    
    d3.select(element)
        .transition()
        .style("opacity", 0)
        .duration(500)
        .each("end", function() {
            d3.select(this)
                .transition()
                .duration(500)
                .style("opacity", 1);
        });
}

module.exports = exports = function() {
    createNewChart(series.age);
        
        $.each(selects, function(s, sv) {
            sv().forEach(function(elements, i) {
                elements.on("mouseenter", function() {
                    highlight(sv);
                });
                elements.on("mouseleave", function() {
                    offlight(sv, s);
                });
                elements.on("click", function() {
                    display(sv, s);
                });
                elements.style("transition", "all 0.4s");
            });
        });
    
    display(selects.age, "age");
    animateSkipper();
    
};