$(function () {
    
    var request = new XMLHttpRequest();
    request.open("GET", "js/data.json", false);
    request.send(null);
    var data_json = JSON.parse(request.responseText);
    
    
    var tab = new Object();
    var top44 = [];
    var flop44 = [];
    var top49 = [];
    var flop49 = [];
    var top53 = [];
    var flop53 = [];
    var top72 = [];
    var flop72 = [];
    var top85 = [];
    var flop85 = [];
    
    
    function extract(CD){
        tab["Arts martiaux"] = (CD[0].arts_martiaux[0].a2015-CD[0].arts_martiaux[0].a2011)/CD[0].arts_martiaux[0].a2015;
        tab["Activités de pleine nature"] = (CD[0].activites_de_pleine_nature[0].a2015-CD[0].activites_de_pleine_nature[0].a2011)/CD[0].activites_de_pleine_nature[0].a2015;
        tab["Activités culturelles et artistiques"] = (CD[0].activites_culturelles_et_artistiques[0].a2015-CD[0].activites_culturelles_et_artistiques[0].a2011)/CD[0].activites_culturelles_et_artistiques[0].a2015;
        tab["Sports collectifs"] = (CD[0].sports_collectifs[0].a2015-CD[0].sports_collectifs[0].a2011)/CD[0].sports_collectifs[0].a2015;
        tab["Sports de raquettes"] = (CD[0].sports_de_raquettes[0].a2015-CD[0].sports_de_raquettes[0].a2011)/CD[0].sports_de_raquettes[0].a2015;
        tab["Sports de boules et précision"] = (CD[0].sports_de_boules_et_precision[0].a2015-CD[0].sports_de_boules_et_precision[0].a2011)/CD[0].sports_de_boules_et_precision[0].a2015;
        tab["Musiques et chants"] = (CD[0].musiques_et_chants[0].a2015-CD[0].musiques_et_chants[0].a2011)/CD[0].musiques_et_chants[0].a2015;
        tab["Eveil"] = (CD[0].eveil[0].a2015-CD[0].eveil[0].a2011)/CD[0].eveil[0].a2015;
        tab["Danses"] = (CD[0].danses[0].a2015-CD[0].danses[0].a2011)/CD[0].danses[0].a2015;
        tab["Gymnastique féminine"] = (CD[0].gymnastique_feminine[0].a2015-CD[0].gymnastique_feminine[0].a2011)/CD[0].gymnastique_feminine[0].a2015;
        tab["Gymnastique masculine"] = (CD[0].gymnastique_masculine[0].a2015-CD[0].gymnastique_masculine[0].a2011)/CD[0].gymnastique_masculine[0].a2015;
        tab["Gymnastique rythmique"] = (CD[0].gymnastique_rythmique[0].a2015-CD[0].gymnastique_rythmique[0].a2011)/CD[0].gymnastique_rythmique[0].a2015;
        tab["Twirling"] = (CD[0].twirling[0].a2015-CD[0].twirling[0].a2011)/CD[0].twirling[0].a2015;
        tab["Autres activités gymniques"] = (CD[0].autres_activites_gymniques[0].a2015-CD[0].autres_activites_gymniques[0].a2011)/CD[0].autres_activites_gymniques[0].a2015;
        tab["Activités de remise en forme"] = (CD[0].activites_de_remise_en_forme[0].a2015-CD[0].activites_de_remise_en_forme[0].a2011)/CD[0].activites_de_remise_en_forme[0].a2015;
        return tab;
    }
    
    
    function flop_sort(sortable){
        for (var i in tab) {
            if(!isNaN(tab[i]) && tab[i] != 1 && tab[i] < 0){
                sortable.push([i, tab[i]]);
            }    
        }
        sortable.sort(function(a, b) {return a[1] - b[1]});
        return sortable;
    }
    
    function top_sort(sortable){
        for (var i in tab) {
            if(!isNaN(tab[i]) && tab[i] != 1 && tab[i] > 0){
                sortable.push([i, tab[i]]);
            }    
        }
        sortable.sort(function(a, b) {return b[1] - a[1]});
        return sortable;
    }
    
    tab = extract(data_json.CD44);
    top44 = top_sort(top44);
    flop44 = flop_sort(flop44);
    
    tab = new Object();
    
    tab = extract(data_json.CD49);
    top49 = top_sort(top49);
    flop49 = flop_sort(flop49);
    
    tab = new Object();
    
    tab = extract(data_json.CD53);
    top53 = top_sort(top53);
    flop53 = flop_sort(flop53);
    
    tab = new Object();
    
    tab = extract(data_json.CD72);
    top72 = top_sort(top72);
    flop72 = flop_sort(flop72);
    
    tab = new Object();
    
    tab = extract(data_json.CD85);
    top85 = top_sort(top85);
    flop85 = flop_sort(flop85);
    
    function test(t){
        if(t.length != 3) {
            t.push("-", "-");
            t.push("-", "-");
            t.push("-", "-");
        }   
    }
    test(top44);
    test(flop44);
    test(top49);
    test(flop49);
    test(top53);
    test(flop53);
    test(top72);
    test(flop72);
    test(top85);
    test(flop85);
    

           
    var data = [
        {
            "hc-key": "fr-r-vd",
            "value": 0,
            "color": "#5D5D5D",
            "name": "vendee",
            "top": {"1":top85[0][0], "2":top85[1][0], "3":top85[2][0]},
            "flop": {"1":flop85[0][0], "2":flop85[1][0], "3":flop85[2][0]}
        },
        {
            "hc-key": "fr-r-st",
            "value": 1,
            "color": "#5D5D5D",
            "top": {"1":top72[0][0], "2":top72[1][0], "3":top72[2][0]},
            "flop": {"1":flop72[0][0], "2":flop72[1][0], "3":flop72[2][0]}
        },
        {
            "hc-key": "fr-r-ml",
            "value": 2,
            "color": "#5D5D5D",
            "top": {"1":top49[0][0], "2":top49[1][0], "3":top49[2][0]},
            "flop": {"1":flop49[0][0], "2":flop49[1][0], "3":flop49[2][0]}
        },
        {
            "hc-key": "fr-r-my",
            "value": 3,
            "color": "#5D5D5D",
            "top": {"1":top53[0][0], "2":top53[1][0], "3":top53[2][0]},
            "flop": {"1":flop53[0][0], "2":flop53[1][0], "3":flop53[2][0]}
        },
        {
            "hc-key": "fr-r-la",
            "value": 4,
            "color": "#5D5D5D",
            "top": {"1":top44[0][0], "2":top44[1][0], "3":top44[2][0]},
            "flop": {"1":flop44[0][0], "2":flop44[1][0], "3":flop44[2][0]}
        }
    ];

    // Initiate the chart
    $('#map').highcharts('Map', {

        title : {
            text: ""
        },
        
        chart : {
            backgroundColor: 'rgba(238, 231, 216, 0)',
            style: {
            	fontFamily: "'Roboto Condensed', sans-serif",
            	color: "#EEE7D8",
            	border: "0px",
            },
            width: 600,
            height: 600
        },
        
        legend :  {
        	enabled: false
        },
        
        credits: {
            enabled: false
        },

        mapNavigation: {
            enabled: false
        },
        
        exporting:{
        		enabled: false
        },
        
        tooltip: {
                enabled: false
        },

        series : [{
            data : data,
            mapData: Highcharts.maps['countries/fr/fr-r-all'],
            joinBy: 'hc-key',

            events: {
                click: function (e) {
                    var content = document.getElementById("topflop");
                    content.innerHTML = 
                        '<center><h3 style="color: #5D5D5D; ">' + e.point.name + '</h3></center>' + 
                        '<div style="position:absolute; width: 100%;">' +
                        '<img src="images/pouces.png" style="width: 15%; margin-left: 10%;"/>' +
                        '<h5 style="position: absolute; top: -10%; left: 33%; width: 100%; color: #345468;"><b>1. ' + e.point.top["1"]  + '</b></h5>' +
                        '<h5 style="position: absolute; top: 0%; left: 33%; width: 100%; color: #345468;"><b>2. ' + e.point.top["2"] + '</b></h5>' +
                        '<h5 style="position: absolute; top: 10%; left: 33%; width: 100%; color: #345468;"><b>3. ' + e.point.top["3"] + '</b></h5>' +
                        '<h5 style="position: absolute; top: 35%; left: 33%; width: 100%; color: #f15125;"><b>1. ' + e.point.flop["1"] + '</b></h5>' +
                        '<h5 style="position: absolute; top: 45%; left: 33%; width: 100%; color: #f15125;"><b>2. ' + e.point.flop["2"] + '</b></h5>' +
                        '<h5 style="position: absolute; top: 55%; left: 33%; width: 100%; color: #f15125;"><b>3. ' + e.point.flop["3"] + '</b></h5>' +
                        '</div>';
                }
            },
                
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
        }]
    });
});