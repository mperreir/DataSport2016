var THREE = window.THREE,
    $ = window.$;

var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
	console.log(item, loaded, total);
};

var loader = {
    obj : new THREE.OBJLoader(manager),
    font: new THREE.FontLoader(manager),
    data: {
        load: $.getJSON
    }
};

module.exports = exports = function(next) {
    
    var that = this;
    
    this.loads = function(assets, i) {
        
        i = i | 0;
        
        if (i === assets.length - 1) {
            return function() {
                loader[assets[i][0]].load(assets[i][1], function(a) {
                    that.assets[assets[i][2]] = a;
                    next();
                });
            };
        }
        
        return function() {
            loader[assets[i][0]].load(assets[i][1], function(a) {
                that.assets[assets[i][2]] = a;
                that.loads(assets, i+1)();
            });
        };
        
    };
    
    this.assets = {};
    
    var toLoad = [
        ["obj", "assets/obj/globe.obj", "globe"],
       // ["obj", "assets/obj/boat.obj", "boat"],
        ["font", "assets/font/droid.typeface.js", "font"],
        ["data", "assets/data/GPSPath.json", "path"],
        ["data", "assets/data/steps.json", "steps"]
    ];
    
    this.loads(toLoad)();
    
};