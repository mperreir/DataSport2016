
function ajout_club()
{
    $.getJSON("json/clubs_new.json",function(data)
	{
	    
		for (var i = 0; i < data.clubs.length; i++)
		{
		    var uneoption = document.createElement("option");
		    var untexte = document.createTextNode((data.clubs)[i].CLUB);
		    uneoption.appendChild(untexte);
		    var liste_choix = document.getElementById("liste_choix");
	        liste_choix.appendChild(uneoption);
        }
	});
}

            
/* initialisation de la fonction initmap */
function initmap() {
    // paramÃ©trage de la carte
    map = new L.Map('map');
    // crÃ©ation des "tiles" avec open street map
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data de OpenStreetMap';
    var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 10, attribution: osmAttrib});           
    // on centre sur la France
    map.setView(new L.LatLng(46.85, 2.3518),6);
    map.addLayer(osm);
}


function element(tableau,valeur)
{
    for (var i=0; i<tableau.length; i++)
    {
        if (tableau[i][3] == valeur) return true;
    }
    return false;
}

function removeAllMarkers(){
    map.removeLayer(markers);
}

/* Creation d'un tableau qui va contenir nos donnes */
/*
* Pour chaque elt du tableay on a les coordonnÃ©es gÃ©ographiques
* une valeur ainsi que le nom de la rÃ©gion franÃ§aise
*/
function ajout_pratiquants()
{
    markers.clearLayers();
    var j = document.Choix.Liste.selectedIndex;
	if (j == 0) return;
    $.getJSON("json/clubs_new.json",function(data)
	{
	    for (var i = 0; i < data.clubs.length; i++)
		{
		    if ((data.clubs)[i].CLUB == document.getElementById("liste_choix").options[j].value)
		    {
		        club = L.marker([(data.clubs)[i].Latitude,(data.clubs)[i].Longitude]).bindPopup((data.clubs)[i].CLUB);
		    }
		}
		markers.addLayer(club);
	});
	
    $.getJSON("json/pratiquants.json",function(data)
	{
	    removeAllMarkers();
	    var tableau = new Array();
	    for (var i = 0; i < data.pratiquant.length; i++)
		{
		    if (((data.pratiquant)[i].club == document.getElementById("liste_choix").options[j].value) && !element(tableau,(data.pratiquant)[i].Ville))
		    {
		        var interm = new Array();
		        interm.push((data.pratiquant)[i].Latitude);
	            interm.push((data.pratiquant)[i].Longitude);
	            interm.push(0);
	            interm.push((data.pratiquant)[i].Ville);
	            var som = 0;
		        for (var k = 0; k < data.pratiquant.length; k++)
    		    {
        		    if (((data.pratiquant)[k].club == document.getElementById("liste_choix").options[j].value) && ((data.pratiquant)[k].Ville == interm[3]))
        		    {
        		        som = som + 1;
        		    }
    		    }
    		    interm[2] = som;
    		    tableau.push(interm);
		        //alert(tableau);
		    }
        }
        
        for (i = 0; i < tableau.length; i++) {
        
            var nbinscrit = tableau[i][2];
            var couleur ="blue";
            
            if (nbinscrit > 100) {
                if (nbinscrit > 1000) {
                    couleur = "red";
                } else {
                    couleur = "orange";
                }
            }
            /*
             * On va crÃ©er un cercle sur la carte pour chaque point
             */
            var circleLocation = new L.LatLng(tableau[i][0], tableau[i][1]),
            circleOptions = {
                color: couleur,
                fillColor: couleur,
                fillOpacity: 0.5
            };
        
            circle = new L.Circle(circleLocation,(100 * nbinscrit), circleOptions);
            // on rajoute un popup sur le cercle
            circle.bindPopup(tableau[i][3]+ " : " + tableau[i][2]+" inscrit(s)");
            // on ajoute le cercle Ã  la carte
            markers.addLayer(circle);
         }
         map.addLayer(markers);
        
    });
   
}
                