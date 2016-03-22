var THREE = window.THREE;

module.exports = exports = function(next) {

	var pointLight = new THREE.PointLight(0xffffff, 0.5);
	this.camera.add(pointLight);
	
    next();
    
};