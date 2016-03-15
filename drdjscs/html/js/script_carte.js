"use strict";

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FtZWJpcmJ5IiwiYSI6IkwwUXRVY28ifQ.ksZug_5n6Zyr-N0EqjfL9Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gamebirby/cilnjnjif0035c4kncaeq95ex',
    center: [-1.54,47.248],
    zoom: 8
});

map.addControl(new mapboxgl.Navigation());

map.on('style.load', function () {
    /////////////// CHARGEMENT DES POINTS /////////////////////
    map.addSource("markers", association);
    map.addLayer({
        "id": "markers",
        "type": "symbol",
        "source": "markers",
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });
    ///////////// FIN CHARGEMENT DES POINTS ///////////////////
    ///////////// CHARGEMENT DES CONTOURS DE LA LOIRE ATLANTIQUE //////////////////////
    var data_loire_atlantique = {
        "type":"geojson"
    };
    data_loire_atlantique.data = loire_atlantique;
    map.addSource("loire",data_loire_atlantique);
    map.addLayer({
        'id': 'contours',
        'type': 'line',
        'source': 'loire',
        'source-layer': 'contour',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#2e2818',
            'line-width': 2
        }
    });
    ///////////// FIN CHARGEMENT DES CONTOURS DE LA LOIRE ATLANTIQUE ///////////////////    
});

map.on('moveend', function () {

    var centre = map.getCenter();

    if (centre.lng > 0.35 || centre.lng < -3 || centre.lat > 48 || centre.lat < 46.3 ){
        map.flyTo({
            center: [-1.54,47.248],
            zoom: 8.5
        });
    }

});

var popup = new mapboxgl.Popup();
/*
map.on('mousemove', function (e) {
    map.featuresAt(e.point, {
        radius: 7.5
    },function (err, features){
        console.log(features);
        document.getElementById('menu').innerHTML = JSON.stringify(features, null, 2);

    });
});*/

var zoom = 8;

map.on('click', function (e) {
    map.featuresAt(e.point, {
        radius: 7.5
    },function (err, features){
        if (zoom < 50) {
            zoom += 1;
        }
        console.log(e.lngLat.lng , e.lngLat.lat);
        map.flyTo({
            center: [e.lngLat.lng , e.lngLat.lat],
            zoom: zoom
        });
    });
});



function perreines(){

}
