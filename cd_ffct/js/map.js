$(document).ready( function(){
    
    $("#map").append(function(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiY3ljYXJvbiIsImEiOiJjaWx2Ymt4Y20wMDhkdnFtNmx2djF2dXd2In0.DAk4uJYDSUdWGsJP8MnMmg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/cycaron/cilvfobh90003cglvaqdki97t',
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
                "circle-color": "#F56D34"
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
                .setHTML("<div id = \"popup\"><p>" +feature.properties.club + "</p><p>" + feature.properties.adresse + "</p><p>" + feature.properties.commune +"</p></div>")
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
    
});

