var globeTransitions = require("./globeTransitions.js");

var events = {
    "page-de-garde": [require("./page-de-garde.js"), false],
    data_recomp: [require("./data_recomp.js"), false],
    data_skipper: [require("./data_skipper.js"), false],
    data_pieges: [require("./data_pieges.js"), false],
    data_victoire: [require("./data_victoire.js"), false]
};

$.extend(events, globeTransitions);

module.exports = exports = {
    afterLoad: function(anchorLink, index) {
        console.log(anchorLink);
        
        if (events[anchorLink] && events[anchorLink][1] >= 0) {
            events[anchorLink][0]();
            $(".player").each(function() {
                try {
                    $(this).YTPPause();
                } catch(e) {}
            });
            if (events[anchorLink][1] == 0) {
                events[anchorLink][1] = -1;
            }
        }
    }
};