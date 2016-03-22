var THREE = window.THREE;

module.exports = exports = function(next) {

    this.camera = new THREE.PerspectiveCamera(75, global.WIDTH / global.HEIGHT, 0.1, 1000);

    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = global.DISTANCE*1.4;
    
    this.scene.add(this.camera);
    
    next();
    
};