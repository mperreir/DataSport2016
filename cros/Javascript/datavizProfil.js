/***************************************Paramètres initiaux du Highchart que nous voulons créer plus loin***************************************/


//Catégories d ages
//var categories = ['0-8', '9-10', '11-12', '13-14',
  //          '15-16', '17-18', '19-20', '21+'];
var categories = ['-14','15-16', '17-18', '19+'];
            
//Options de la data viz
var options = {
        chart: {
                type: 'bar',
                renderTo:'viz1',
                style: {
                    fontFamily: 'sansserif'
                }
                
            },
            title: {
                text: 'COMPETITORS\' PROFILE',
                style:{
                    fontWeight: 'bold',
                    fontSize: '35px'
                }
            },
            subtitle: {
                text: 'Origine: '
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                min:-100,
                max:100,
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar:{
                    borderRadius:5
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0)+'%';
                }
            },
        series: [{
            "name": "Male",
            "data": []
            }, {
            "name": "Female",
            "data": []
        }]
};
//Au chargement de la page
$(function(){
    dataVizProfil("Aquitaine");
    var img = document.images["sport"];
    //img.src="./Pictogrammes/Voile.jpg"
});


/**************************Fonction calculant (plus tard) le sport le plus pratiqué parmi les participants venant d'une même région**************************/


function sportPref(pays,region){
   var sports=[];
   
    for (var j in pays[region]){
        //console.log("Pouet plop")
        if(sports[pays[region][j].NomSport]){
            sports[pays[region][j].NomSport]+=1;
        }
        else{
            sports[pays[region][j].NomSport]=1;
        }
        
   }
   var sportPrefere='';
   var tmp=0;
   for (var k in sports){
       if (tmp<sports[k]){
           tmp=sports[k];
           sportPrefere=k;
       }
   }
   
    return sportPrefere;
}


/***************************************(Future) Restructuration de nos données***************************************/ 

function arrangeData(data){
    
    //Restructuration du json passé en paramètre sous la forme d'un tableau avec le nom des pays comme clé. 
    //Chaque case retourne la liste de tous les joueurs du pays en question.
    //On accède donc au tableau des joueurs de chaque pays par pays["Nom Du Pays"] /!\ Attention aux majuscules
    var pays = [];
    var listePays=[];
    var cmpt=0;
        for (var i in data) {
            if (!pays[data[i].NomPays]) {
                pays[data[i].NomPays] = [];
                listePays[cmpt]=data[i].NomPays;
                cmpt++;
            }
            pays[data[i].NomPays].push(data[i]);
        }
        //ListePays et cmpt utiles pour la génération automatique de la liste des pays à choisir
    return [pays,listePays];
}



/***************************************(Futur) Calcul des Datas à fournir***************************************/ 

function pourcentageAges(pays,region){
    var calc;
    var unPays = pays[region];
    
    // Vecteurs des fréquences par tranche d'âges [0-8,9-10,11-12,13-14,15-16,17-18,19-20,20-+]
    unPays.vectAgeM=[0,0,0,0];
    unPays.vectAgeF=[0,0,0,0];
    var nbJoueurs = 0;
    
    //On inspecte chaque joueur du pays choisi
    for (var j in unPays) {
            
        if ((unPays[j].Age)&&(unPays[j].Sexe!="")) { //Cette condition teste si l'âge et le sexe ne sont pas indéfinis ou null
            
            nbJoueurs++;
            
            //Si on trouve un homme
            if (unPays[j].Sexe=="M"){
                //On ajoute 1 dans la bonne tranche d'âge
                if (unPays[j].Age>18){
                        unPays.vectAgeM[3]+=1;
                }
                if (unPays[j].Age<15){
                        unPays.vectAgeM[0]+=1;
                }
                if((unPays[j].Age>=15)&&(unPays[j].Age<=18)){
                       calc=parseInt(((unPays[j].Age*1)%14)/2);
                       unPays.vectAgeM[calc]+=1;
                 
                }
            }
            // Sinon si c'est une femme
            else{
                 //On ajoute 1 dans la bonne tranche d'âge
                if (unPays[j].Age>18){
                      unPays.vectAgeM[3]+=1;
                }
                if (unPays[j].Age<15){
                      unPays.vectAgeM[0]+=1;
                }
                if((unPays[j].Age>=15)&&(unPays[j].Age<=18)){
                      calc=parseInt(((unPays[j].Age*1)%14)/2);
                      unPays.vectAgeF[calc]+=1;
                }
            }
        }
    }
    //On s'arrange pour obtenir un pourcentage.
    //Le moins pour l'un des 2 tableaux s'explique. C'est pour centrer notre figure.
    for(var i in unPays.vectAgeM){
            unPays.vectAgeM[i]*=(-100/nbJoueurs);
            unPays.vectAgeF[i]*=(100/nbJoueurs);
    }
    return pays;
}

/***************************************Génération automatique de la liste des choix***************************************/

function genereListe(){
    $.getJSON('Data/Joueurs.json', function(datas) {

            //Données restructurées
            var dat=arrangeData(datas);

            //Liste déroulante... Souci de répétition à chaque changement...
            
    //On récupère la balise de notre liste
    var balise=document.getElementById('Pouet');
    var b;
    for (var i in dat[1]){
        b=document.createElement('option');
        b.innerHTML=dat[1][i];
        balise.appendChild(b);
        //$('choix').append('<option>'+listeRegions[i]+'</option>');
    }
    });
}

/***************************************Data visualisation***************************************/    

 function dataVizProfil(region){
 
  $(document).ready(function() {
     
     //------------Récupération des données------------//
       $.getJSON('Data/Joueurs.json', function(datas) {

            //Données restructurées
            var dat=arrangeData(datas);
            var pays=dat[0];

            // Calcul des pourcentages à fournir à notre Data Viz
            pays=pourcentageAges(pays,region);
            var sportPrefere=sportPref(pays,region);
            
            
            //On met à jour les données pour la data Viz
                options.subtitle.text='Origine : '+ region +'/ Sports Principaux : '+sportPrefere;
                var img = document.images["sport"];
                img.src="./Pictogrammes/"+sportPrefere+".jpg";
                options.series[0].data = pays[region].vectAgeM;
                options.series[1].data = pays[region].vectAgeF;
                var chart = new Highcharts.Chart(options);
                
        });
    

});
}



/***************************************Gère la réactivité de la liste***************************************/

function submitChange(liste){

    var val = liste.options[liste.selectedIndex].textContent;
    dataVizProfil(val);
     
}



