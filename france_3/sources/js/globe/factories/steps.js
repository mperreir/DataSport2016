var THREE = window.THREE;
var marker = require("./markers.js");

module.exports = exports = function(globe, steps) {
    
    marker.call(this, globe.earth);
    
    var that = this;

    this.createBaseMesh = function(text) {
        
        that.baseMesh = new THREE.Group();
            
        var pointer = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1, 8, 1), red);
        pointer.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 0.5));
        
        that.baseMesh.add(pointer);
        
        var textGeo = new THREE.TextGeometry(text, {
            font: globe.assets.font,
            height: 0.40,
            size: 1.5
        });
        
        var textMesh = new THREE.Mesh(textGeo, red);
        var mS = (new THREE.Matrix4()).identity();
        mS.elements[0] = -1;
        mS.elements[10] = -1;
        textMesh.geometry.applyMatrix(mS);
        that.baseMesh.add(textMesh);
        
    };
    
    var red = new THREE.MeshPhongMaterial({
        color: new THREE.Color("#be1522")
    });
    
    this.list = [];
    for (var s in steps) {
        this.list.push({
           id: steps[s].id,
           lat: steps[s].lat * 1,
           long: steps[s].long * 1,
           index: steps[s].index * 1
        });
        this.createBaseMesh(steps[s].id);
        that._add(this.list[s]);
    }
    
    return this.list;
    
};