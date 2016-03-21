global.HEIGHT = window.innerHeight;
global.WIDTH = window.innerWidth;
global.RADIUS = 50;
global.DISTANCE = 100;

var $ = window.$,
    TimelineMax = window.TimelineMax,
    Ease = window.Ease;

var Globe = require("./globe/globe.js");
var events = require("./sliders/events.js");
var tooltip = require("./utils/tooltip.js");
var button = require("./utils/button.js");


global.g = new Globe($("#globe"), function() {
     
    global.g.commands.goTo(" Les Sables d'Olonne", true);

    $.fn.autoInc(function() {
    	$('#fullpage').fullpage({
            afterLoad: events.afterLoad,
            onLeave: function(a, b, direction) {
                if (direction == "up") {
                    return false;
                }
            },
            lockAnchors: true
    	});
    	
    	tooltip();
    	button.start();
    	$(".player").YTPlayer();
        $(".player").each(function() {
            try {
                $(this).YTPPause();
            } catch(e) {}
        });
    });

});
