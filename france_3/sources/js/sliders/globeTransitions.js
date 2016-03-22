var button = require("../utils/button.js");

function next() {
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
    global.g.commands.nextStep(200 / 10000, function() {
        setTimeout(function() {
            $.fn.fullpage.moveSectionDown();
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        }, 800);
    });
}

module.exports = exports = {
    t1: [function() {
        button.stop();
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
        global.g.commands.zoom(3000 / 1000, function() {
            setTimeout(function() {
                $.fn.fullpage.moveSectionDown();
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
            }, 800);

        });
    }, false],
    t2: [function() {
        next();
    }, false],
    t3: [function() {
        next();
    }, false],
    t4: [function() {
        next();
    }, false],
    t5: [function() {
        next();
    }, false],
    t6: [function() {
        next();
    }, false],
    t7: [function() {
        next();
    }, false],
    t8: [function() {
        next();
    }, false],
};