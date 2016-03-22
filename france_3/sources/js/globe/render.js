var THREE = window.THREE;
var coords = require("./utils/coords.js");

var i = 0;

module.exports = exports = function() {
    var that = this;
    this.camera.lookAt(new THREE.Vector3(0,0,0));
    //var a = this.path[(this.pathIndex + 1) % this.path.length];
    //this.boat.lookAt(new THREE.Vector3(a.x*1, a.y*1, a.z*1));
    
    
    //this.boat.position.copy(this.pathWay.getPointAt(this.pathIndex));
    /*
    tangent = spline.getTangentAt(counter).normalize();
    axis.crossVectors(up, tangent).normalize();
    var radians = Math.acos(up.dot(tangent));
    box.quaternion.setFromAxisAngle(axis, radians);
    */
    that.renderer.render(this.scene, this.camera);

};