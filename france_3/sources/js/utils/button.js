var $ = window.$,
    TweenMax = window.TweenMax,
    Power1 = window.Power1,
    t;

module.exports = exports = {
    start: function() {
        t = TweenMax.to("#bottomButton", 0.5, {
            bottom: "0%",
            ease: Power1.easeInOut,
            repeat: -1,
            yoyo: true
        });
    },
    stop: function() {
        t.kill();
        $("#bottomButton").fadeOut(0);
    }
};