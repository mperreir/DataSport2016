function initMap() {
     var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 19,
        center: new google.maps.LatLng(47.21806, -1.55278),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    map.data.loadGeoJson('../data/data.json');    
    //map.data.loadGeoJson('https://storage.googleapis.com/maps-devrel/google.json');

    map.data.setStyle({
        fillColor: 'black',
        strokeWeight: 20
    });

}