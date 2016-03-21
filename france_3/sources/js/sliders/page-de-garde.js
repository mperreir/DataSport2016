var loader_TL = window.loader_TL;

module.exports = exports = function() {
    loader_TL.stop();
    $("#loader").fadeTo(2000, 0, function() {
        $("#loader").css("display", "none");    
    });
    $("#container").css("visibility", "visible");
};