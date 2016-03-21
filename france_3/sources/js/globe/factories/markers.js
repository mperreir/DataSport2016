var THREE = window.THREE;
var coords = require("../utils/coords.js");

module.exports = exports = function(earth) {

    var that = this;

    this.markers = new THREE.Group();
    earth.add(this.markers);
    
    this._add = function (cc) {
        
        var m = that.baseMesh.clone();
        
        var p = coords.latLongToVector3(cc.lat, cc.long, 49.25 / 50 * global.RADIUS);
        m.position.copy(p);
        m.lookAt(that.markers.position);
        
        that.markers.add(m);
        cc.marker = m;
        
    };
  
/*
    this.highlightCityMesh = function(m){
        var s = {
          scale: 1.0,
          up: 0.0
        };
        new TWEEN.Tween( s )
        .to({
          scale: 3.0,
          up: 2.0
        }, 2000 )
        .easing( TWEEN.Easing.Elastic.Out )
        .onUpdate( function(){
          m.scale.set( s.scale, s.scale, s.scale );
          m.position.z = -s.up;
        })
        .start();
    
        m.update = function(){
          this.rotation.z = Date.now() * 0.001;
        };
    };

  function deHighlightCityMesh(m){
    var s = {
      scale: 3.0,
      up: 2.0
    };
    new TWEEN.Tween( s )
    .to({
        scale: 1.0,
        up: 0.0
    }, 1500 )
    .easing( TWEEN.Easing.Elastic.Out )
    .onUpdate( function(){
        m.scale.set( s.scale, s.scale, s.scale );
        m.position.z = -s.up;
    })
    .start();

    m.update = undefined;
  }
*/

    var lastHighlighted;

/*
  that.highlightCity = function( cityName ){
    if(lastHighlighted){
      deHighlightCityMesh( lastHighlighted );
    }

    lastHighlighted = cityLookup[cityName];
    highlightCityMesh( lastHighlighted );
  };
*/


    this.hide = function(){
        that.markers.traverse(function(m){
            m.visible = false;
        });
    };

    this.show = function(){
        that.markers.traverse(function(m){
            m.visible = true;
        });
    };
  
};