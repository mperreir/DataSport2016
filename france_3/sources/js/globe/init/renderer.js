var THREE = window.THREE;
var $ = window.$;
var resize = require("../utils/resize.js");
var render = require("../render.js");

module.exports = exports = function(next) {
    
    var that = this;
    
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    
    this.renderer.setClearColor( 0x000000, 0 );
    this.renderer.setSize(global.WIDTH, global.HEIGHT);
    
    this.container.append(this.renderer.domElement);

    this.render = render.bind(this);
    
 //   this.render();
    
    resize(this.renderer, this.camera);
    
    next();
    
    $(window).resize(function() {
        that.render();
    });
    
};