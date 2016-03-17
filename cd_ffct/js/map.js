$(document).ready( function(){
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3ljYXJvbiIsImEiOiJjaWx2Ymt4Y20wMDhkdnFtNmx2djF2dXd2In0.DAk4uJYDSUdWGsJP8MnMmg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [-1.54, 47.248],
        zoom: 8
    });
    
    map.on('style.load', function () {
        map.addSource("clubs_data", {
            "type": "geojson",
            "data" : "json/clubs_loire_atlantique.geojson"  

        });
        
        map.addLayer({
            "id": "clubs_data",
            "type": "circle",
            "interactive": true,
            "source": "clubs_data",
            "paint": {
                "circle-radius": 8,
                "circle-color": "rgba(55,148,179,1)"
            }
        });
        
        var popup = new mapboxgl.Popup();

        // When a click event occurs near a marker icon, open a popup at the location of
        // the feature, with description HTML from its properties.
        map.on('click', function (e) {
        map.featuresAt(e.point, {
        radius: 7.5, // Half the marker size (15px).
        includeGeometry: true,
        layer: 'clubs_data'
        }, function (err, features) {

            if (err || !features.length) {
                popup.remove();
                return;
            }

            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.club + "<br/>" + feature.properties.adresse + "<br/>" + feature.properties.commune)
                .addTo(map);
            });
        });
        
        map.on('mousemove', function (e) {
            map.featuresAt(e.point, {
            radius: 7.5, // Half the marker size (15px).
            layer: 'clubs_data'
        }, function (err, features) {
            map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
            });
        });

    });
});

