var THREE = window.THREE;
    
var inits = [
    require("./init/commands.js"),
    require("./init/assets.js"),
    require("./init/camera.js"),
    require("./init/light.js"),
    require("./init/renderer.js"),
    require("./init/solids.js"),
    require("./init/path.js"),
    require("./init/steps.js"),
];

function Globe(container, onload) {
    
    var that = this;
    if (!onload) {
        onload = function() {};
    }
    
    this.init = function(inits, i) {
        
        i = i | 0;
        
        if (i === inits.length - 1) {
            return function() {
                inits[i].bind(that)(onload);
            };
        }
        
        return function() {
            inits[i].bind(that)(that.init(inits, i+1));
        };
        
    };
    
    this.container = container;
    this.scene = new THREE.Scene();
    
    this.init(inits)();

}

module.exports = exports = Globe;

//Line3 > http://threejs.org/docs/#Reference/Math/Line3
//