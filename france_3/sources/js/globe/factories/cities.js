var THREE = window.THREE;
var marker = require("./markers.js");

module.exports = exports = function(globe) {
    
    marker.call(this, globe.earth);
    
    var that = this;
    
    var red = new THREE.MeshPhongMaterial({
        color: 0xff0000
    });

    this.add = function(text, cc) {
        that.createBaseMesh(text);
        that._add(cc);
    };

    this.createBaseMesh = function(text) {
        that.baseMesh = new THREE.Group();
            
        var pointer = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1, 8, 1), red);
        pointer.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 0.5));
        
        that.baseMesh.add(pointer);
        
        var textGeo = new THREE.TextGeometry(text, {
            font: globe.assets.font,
            height: 0.20,
            size: 1.5
        });
        
        var textMesh = new THREE.Mesh(textGeo, red);
        var mS = (new THREE.Matrix4()).identity();
        mS.elements[0] = -1;
        mS.elements[10] = -1;
        textMesh.geometry.applyMatrix(mS);
        that.baseMesh.add(textMesh);
        
    };

    
    return this;
    
};