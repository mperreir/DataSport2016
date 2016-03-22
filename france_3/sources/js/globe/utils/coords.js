var THREE = window.THREE;

var Coordinates = {
    
  degToRad: function(d) {
    return d / 180 * Math.PI;
  },

  toRadians: function(lat, long) {
    return {
      lat: Coordinates.degToRad(-lat) + Math.PI * 0.5,
      long: Coordinates.degToRad(-long) + Math.PI * 0.5
    };
  },

  toSpherical: function(lat, long, r) {
    var ll = Coordinates.toRadians(lat, long);
    return {
      lat: ll.lat,
      long: ll.long,
      radius: r
    };
  },

  sphericalToXYZ: function(spherical) {
    return {
      x: spherical.radius * Math.cos(spherical.long) * Math.sin(spherical.lat),
      y: spherical.radius * Math.cos(spherical.lat),
      z: spherical.radius * Math.sin(spherical.long) * Math.sin(spherical.lat)
    };
  },

  latLongToXYZ: function(lat, long, radius) {
    return Coordinates.sphericalToXYZ(Coordinates.toSpherical(lat, long + 90, radius));
  },

  latLongToVector3: function(lat, long, radius) {
    var xyz = Coordinates.latLongToXYZ(lat, long, radius);
    return new THREE.Vector3(xyz.x, xyz.y, xyz.z);
  },
  
  dist: function(v1, v2) {
    return Math.abs(v1.lat - v2.lat) + Math.abs(v1.long - v2.long); 
  },
  
  align: function(o, c, k) {
    
    var vector = {
      x: c.x - o.x,
      y: c.y - o.y,
      z: c.z - o.z
    };
    
    var dist = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
    var nVector = {
      x: vector.x / dist,
      y: vector.y / dist,
      z: vector.z / dist
    };
    
    return {
      x: c.x + nVector.x * k,
      y: c.y + nVector.y * k,
      z: c.z + nVector.z * k
    };
    
  }
  
};

module.exports = exports = Coordinates;