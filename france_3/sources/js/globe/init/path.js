var THREE = window.THREE;
var coords = require("../utils/coords.js");

function pathWay(globe) {
    var geometry = new THREE.Geometry();
    geometry.vertices = globe.path;

    var material = new THREE.LineBasicMaterial(
        {
            color: new THREE.Color("#cca058"),
            opacity: 1,
            linewidth: 50
        }
    );

    this.pathWay = new THREE.Line(geometry, material);
    
    globe.earth.add(this.pathWay);
}

module.exports = exports = function(next) {
    
    this.path = [];
    this.pathView = [];
    this.pathBoat = [];
    
    for (var p in this.assets.path) {
        var point = this.assets.path[p];
        this.path.push(coords.latLongToXYZ(point.a, point.o, 49.25 / 50 * global.RADIUS));
        this.pathView.push(coords.latLongToXYZ(point.a, point.o, global.DISTANCE));
        this.pathBoat.push(coords.latLongToXYZ(point.a, point.o, global.RADIUS + 1));
    }
    
    this.firstPoint = coords.latLongToXYZ(this.assets.path[0].a, this.assets.path[0].o, global.DISTANCE*1.4);
    
    this.pathWay = pathWay(this);

    next();
    
};