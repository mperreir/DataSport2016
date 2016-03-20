//var map;
            /* initialisation de la fonction initmap */
            function initmap() {
                // paramÃ©trage de la carte
                map = new L.Map('map');
                // crÃ©ation des "tiles" avec open street map
                var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
               
               
               //var osmUrl='https://www.google.fr/maps/France/{z}/{x}/{y}.png';
               
               
               
                //https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='
                var osmAttrib='Map data de OpenStreetMap';
               //var osmAttrib = '©OpenStreetMap, ©CartoDB';
                var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 10, attribution: osmAttrib});           
                // on centre sur la France
                map.setView(new L.LatLng(46.85, 2.3518),6);
                //map.setView(new L.LatLng(47.7632836, -0.3299687),6);
                map.addLayer(osm);
            }
            /* on va procÃ©der Ã  l'initialisation de la carte */
            
    
            /* Creation d'un tableau qui va contenir nos donnes */
            /*
             * Pour chaque elt du tableay on a les coordonnÃ©es gÃ©ographiques
             * une valeur ainsi que le nom de la rÃ©gion franÃ§aise
             */
            /* On boucle sur le tableau pour y placer les points */
            
            
function lesclubs() {
    console.log("debut club");
     $.getJSON('json/clubs_2.json', function(data) {
         for (var i = 0; i < data.clubs.length; i++) {
                
                var nom = data.clubs[i].CLUBS;
                console.log( data.clubs[2].CLUBS);
                var couleur ="blue";
              
                
                
                /*
                 * On va crÃ©er un cercle sur la carte pour chaque point
                 */
                var circleLocation = new L.LatLng(data.clubs[i].LATITUDE, data.clubs[i].LONGITUDE);
                circleOptions = {
                    color: couleur,
                    fillColor: couleur,
                    fillOpacity: 2,
                    offset:new L.point(20,20)
                };
     
                var circle = new L.Circle(circleLocation,(data.clubs[i].LICENCIES), circleOptions);
               //var circle = new L.Circle(circleLocation,( (100)), circleOptions);
                // on rajoute un popup sur le cercle
           
                circle.bindPopup(nom+ " "+"avec"+" " +data.clubs[i].LICENCIES+" "+"licenciés dont"+" "+data.clubs[i].NB_T+" "+"pour la compétition"+" "+data.clubs[i].NB_P+" "+"pour le loisir");
                // on ajoute le cercle Ã  la carte
                map.addLayer(circle);
                console.log("je suis function les clubs");
            }


    })
    
}

            