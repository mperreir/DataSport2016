$(function() {
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 1500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        absinit=60,
        listexhomme = [],  //Contient la dernière abscisses pour chaque tranche d'âge
        effpartrancheh=[], //Contient l'effectif masculin par tranche de tous les sports
        effpartranchef=[], //Contient l'effectif feminin par tranche de tous les sports
        ordh=450, //variable pour l'ordonnée initialé à 450
        //ordf=450,
        ordinit=450; // initialisation de l'ordonnée de la pyramide
        
    // Création du svf
    
    var svg = d3.select("body").append("svg") 
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    
    var i;
    var eff;
    var cote = 15;
    
    // Initialisation des listes 
    
    for (a=0;a<9;a++){
            listexhomme.push(absinit);
            effpartrancheh.push(0);
            effpartranchef.push(0);
    }
    
    // Parcours des données 
    $.getJSON("data/pyramide.json", function(donnees) {
        $.each(donnees,function(key, value){
            //Compte l'effectif par tranche et par sexe
            for (i=0;i<9;i++) {
                effpartrancheh[i]=effpartrancheh[i]+value.masculin[i];
                effpartranchef[i]=effpartranchef[i]+value.feminin[i];
            }
        });
        //Dessine les hommes par tranches avec 2 lignes par tranche
        for (i=0;i<9;i++) {
        var absh=absinit;
            if (effpartrancheh[i]%2==0) { //Effectif pair
                for (eff=0;eff<(effpartrancheh[i]/2);eff++) {
                    var rect = d3.select("svg").append("rect") // Tracer le rectangle correspondant à un homme
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#696969");
                    absh=absh+cote+5; // Espace entre 2 hommes
                }
                listexhomme[i]=absh; //Met en mémoire le dernier homme de la tranche 
                ordh=ordh-cote-5; // permet de passer à la deuxieme ligne de la tranche
                absh=absinit;
                for (eff=(effpartrancheh[i]/2);eff<effpartrancheh[i];eff++) { //dessiner les hommmes sur la deuxième ligne de la tranche
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#696969");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            } else { //effectif impair
                for (eff=0;eff<(Math.floor(effpartrancheh[i]/2)+1);eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#696969");
                    absh=absh+cote+5;
                }
                listexhomme[i]=absh;
                ordh=ordh-cote-5;
                absh=absinit;
                for (eff=(Math.floor(effpartrancheh[i]/2)+1);eff<effpartrancheh[i];eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#696969");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            }
            ordh=ordh-5; //Espace entre les tranches
        }
        ordh=ordinit;
        for (i=0;i<9;i++) { //Trace traits verticaux pour séparer homme et femme
            if (listexhomme[i]!=absinit){
                var line = d3.select("svg").append("line")
                .attr("x1",listexhomme[i]+15)
                .attr("y1",ordh-5)
                .attr("x2",listexhomme[i]+15)
                .attr("y2",ordh-40)
                .attr("stroke","#f8e82f")
                .attr("fill","#f8e82f")
                .attr("stroke-width",0.7);
            ordh=ordh-45;
            listexhomme[i]=listexhomme[i]+15;
            } else {
                ordh=ordh-25;
            }
        }
        ordh=ordinit;
        for (i=0;i<9;i++) { //Même chose avec les femmes
            var absh=listexhomme[i];
            if (effpartranchef[i]%2==0) {
                for (eff=0;eff<(effpartranchef[i]/2);eff++) {
                    console.log("Coucou");
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#696969");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
                absh=listexhomme[i];
                for (eff=(effpartranchef[i]/2);eff<effpartranchef[i];eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#696969");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            } else {
                for (eff=0;eff<(Math.floor(effpartranchef[i]/2)+1);eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#696969");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
                absh=listexhomme[i];
                for (eff=(Math.floor(effpartranchef[i]/2)+1);eff<effpartranchef[i];eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#696969");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            }
            ordh=ordh-5;
        }
    });

    
    
    /*var femme = d3.select("svg").append("path")
        .attr("fill","#7C7C7C")
        .attr("d","M22.1,29L0.2,99.3c-0.2,0.7,0.4,1.4,1.3,1.4h11.1c0.4,0,0.7-0.1,0.9-0.3c1.9-1.6,10.7-8.4,20.2-0.1   c0.2,0.2,0.6,0.3,0.9,0.3h10.9c0.9,0,1.5-0.7,1.3-1.4L24.7,29L22.1,29z");*/
     
    var tinit=451;
    var inttexte=45;
    
    //Indiciation des tranches
    
    var t1 = d3.select("svg").append("text") 
        .text("10 - 14")
        .attr("x",0)
        .attr("y",tinit)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
        
    var t2 = d3.select("svg").append("text")
        .text("15 - 19")
        .attr("x",0)
        .attr("y",tinit-inttexte)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
        
    var t3 = d3.select("svg").append("text")
        .text("20 - 24")
        .attr("x",0)
        .attr("y",tinit-2*inttexte)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
    
    var t4 = d3.select("svg").append("text")
        .text("25 - 29")
        .attr("x",0)
        .attr("y",tinit-3*inttexte)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
        
    var t5 = d3.select("svg").append("text")
        .text("30 - 34")
        .attr("x",0)
        .attr("y",tinit-4*inttexte)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
        
    var t6 = d3.select("svg").append("text")
        .text("35 - 39")
        .attr("x",0)
        .attr("y",tinit-5*inttexte)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
    
    var t7 = d3.select("svg").append("text")
        .text("40 - 44")
        .attr("x",0)
        .attr("y",tinit-6*inttexte)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
        
    var t8 = d3.select("svg").append("text")
        .text("45 - 49")
        .attr("x",0)
        .attr("y",tinit-7*inttexte)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
        
    var t9 = d3.select("svg").append("text")
        .text("50 et +")
        .attr("x",0)
        .attr("y",tinit-8*inttexte)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
    
    
    
    // Titre "Age'
        
    var age = d3.select("svg").append("text")
        .text("AGE")
        .attr("x",10)
        .attr("y",42)
        .attr("font-size",14)
        .attr("fill","#E6E6FA");
   
    //Ligne horizontale en dessous de age
    var linehorizontaletitreage = d3.select("svg").append("line")
        .attr("x1",3)
        .attr("y1",52)
        .attr("x2",47)
        .attr("y2",52)
        .attr("stroke","#f8e82f")
        .attr("stroke-width",0.7);
      
     //Titre "Pyramide des ages"  
    var titrepyr = d3.select("svg").append("text")
        .text("PYRAMIDE DES AGES ET DES SEXES")
        .attr("x",540)
        .attr("y",42)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
    
    //Ligne horizontale haute   
    var linehaute = d3.select("svg").append("line")
                .attr("x1",0)
                .attr("y1",22)
                .attr("x2",1000)
                .attr("y2",22)
                .attr("stroke","#f8e82f")
                .attr("stroke-width",0.7);
    
    //Ligne horizontale basse
    var linebasse = d3.select("svg").append("line")
                .attr("x1",0)
                .attr("y1",500)
                .attr("x2",1000)
                .attr("y2",500)
                .attr("stroke","#f8e82f")
                .attr("stroke-width",0.7);  
    
    
    //Titre du sport 
    var titresport = d3.select("svg").append("text")
        .text("Cyclisme")
        .attr("x",540)
        .attr("y",142)
        .attr("font-size",14)
        .attr("fill","#f8e82f");
   
   //Trait en dessous le titre du sport     
    var line = d3.select("svg").append("line")
                .attr("x1",540)
                .attr("y1",152)
                .attr("x2",1000)
                .attr("y2",152)
                .attr("stroke","#f8e82f")
                .attr("stroke-width",0.7);
    
    //Titre Nombre de licenciés
    var titresport1 = d3.select("svg").append("text")
        .text("Nombre de licenciés")
        .attr("x",560)
        .attr("y",182)
        .attr("font-size",12)
        .attr("fill","#E6E6FA");
    
    //Nombre total de licenciés    
    var nbtotal = d3.select("svg").append("text")
        .text("17")
        .attr("x",550)
        .attr("y",240)
        .attr("font-size",40)
        .attr("fill","#E6E6FA");
    
    //Nombre d'hommes pratiquant ce sport    
    var nbhomme = d3.select("svg").append("text")
        .text("13")
        .attr("x",620)
        .attr("y",230)
        .attr("font-size",20)
        .attr("fill","#E6E6FA");
    
     //Nombre de femmes pratiquant ce sport
    var nbfemme = d3.select("svg").append("text")
        .text("4")
        .attr("x",630)
        .attr("y",260)
        .attr("font-size",20)
        .attr("fill","#E6E6FA");
    
    //Ligne vertical séparant licencié et répartition
    var lineverticaldetail = d3.select("svg").append("line")
                .attr("x1",690)
                .attr("y1",168)
                .attr("x2",690)
                .attr("y2",280)
                .attr("stroke","#f8e82f")
                .attr("stroke-width",0.7);
    
    // Titre répartition
    var titresport2 = d3.select("svg").append("text")
        .text("Répartition")
        .attr("x",730)
        .attr("y",182)
        .attr("font-size",12)
        .attr("fill","#E6E6FA");
    
    //Ligne vertical séparant répartition et age moyen
    var lineverticaldetail2 = d3.select("svg").append("line")
                .attr("x1",840)
                .attr("y1",168)
                .attr("x2",840)
                .attr("y2",280)
                .attr("stroke","#f8e82f")
                .attr("stroke-width",0.7);
    
    //Titre Age moyen            
    var titresport3 = d3.select("svg").append("text")
        .text("Age Moyen")
        .attr("x",890)
        .attr("y",182)
        .attr("font-size",12)
        .attr("fill","#E6E6FA");
    
    //Age moyen du sport    
    var age_moyen = d3.select("svg").append("text")
        .text("21.11 ans")
        .attr("x",890)
        .attr("y",210)
        .attr("font-size",20)
        .attr("fill","#E6E6FA");
        
    //Titre plus jeune
    var plus_jeune = d3.select("svg").append("text")
        .text("Le plus jeune")
        .attr("x",860)
        .attr("y",240)
        .attr("font-size",12)
        .attr("fill","#E6E6FA");
    
    //Titre plus vieux    
    var plus_vieux = d3.select("svg").append("text")
        .text("Le plus vieux")
        .attr("x",860)
        .attr("y",260)
        .attr("font-size",12)
        .attr("fill","#E6E6FA");
     
    // Age plus jeune du sport
    var age_jeune = d3.select("svg").append("text")
        .text("17 ans")
        .attr("x",960)
        .attr("y",240)
        .attr("font-size",12)
        .attr("fill","#E6E6FA");
    
    //Age plus vieux du sport   
    var age_vieux = d3.select("svg").append("text")
        .text("31 ans")
        .attr("x",960)
        .attr("y",260)
        .attr("font-size",12)
        .attr("fill","#E6E6FA");
        
    // Ligne horizontale en dessous age  moyen
    var linehorizontaleage = d3.select("svg").append("line")
                .attr("x1",860)
                .attr("y1",220)
                .attr("x2",1000)
                .attr("y2",220)
                .attr("stroke","#E6E6FA")
                .attr("stroke-width",0.7);
});

function Specification(sport){
    $.getJSON("data/pyramide.json", function(donnees) {
        $.each(donnees,function(key, value){
            var effectifsporth=[];
            var effectifsportf=[];
            var nblicencie;
            var nbhomme;
            var nbfemme;
            var agemoyen;
            var plusjeune;
            var plusvieux;
            var i;
            if (sport==value) {
                for (i=0;i<9;i++){
                    effectifsporth.push(value.masculin[i]);
                    effectifsportf.push(value.feminin[i]);
                    nblicencie=nblicencie+value.masculin[i]+value.feminin[i];
                    nbhomme=nbhomme+value.masculin[i];
                    nbfemme=nbfemme+value.feminin[i];
                    agemoyen=value.age_moyen[0];
                    plusjeune=value.plus_jeune[0];
                    plusvieux=value.plus_vieux[0];
                }
            }
            //Titre du sport 
            var titresport = d3.select("svg").append("text")
                .text(value)
                .attr("x",540)
                .attr("y",142)
                .attr("font-size",14)
                .attr("fill","#f8e82f");
           
           //Trait en dessous le titre du sport     
            var line = d3.select("svg").append("line")
                        .attr("x1",540)
                        .attr("y1",152)
                        .attr("x2",1000)
                        .attr("y2",152)
                        .attr("stroke","#f8e82f")
                        .attr("stroke-width",0.7);
            
            //Titre Nombre de licenciés
            var titresport1 = d3.select("svg").append("text")
                .text("Nombre de licenciés")
                .attr("x",560)
                .attr("y",182)
                .attr("font-size",12)
                .attr("fill","#E6E6FA");
            
            //Nombre total de licenciés    
            var effectiftotalsport = d3.select("svg").append("text")
                .text(nblicencie)
                .attr("x",550)
                .attr("y",240)
                .attr("font-size",40)
                .attr("fill","#E6E6FA");
            
            //Nombre d'hommes pratiquant ce sport    
            var effectifhommesport = d3.select("svg").append("text")
                .text(nbhomme)
                .attr("x",620)
                .attr("y",230)
                .attr("font-size",20)
                .attr("fill","#E6E6FA");
            
             //Nombre de femmes pratiquant ce sport
            var effectiffemme= d3.select("svg").append("text")
                .text(nbfemme)
                .attr("x",630)
                .attr("y",260)
                .attr("font-size",20)
                .attr("fill","#E6E6FA");
            
            //Ligne vertical séparant licencié et répartition
            var lineverticaldetail = d3.select("svg").append("line")
                        .attr("x1",690)
                        .attr("y1",168)
                        .attr("x2",690)
                        .attr("y2",280)
                        .attr("stroke","#f8e82f")
                        .attr("stroke-width",0.7);
            
            // Titre répartition
            var titresport2 = d3.select("svg").append("text")
                .text("Répartition")
                .attr("x",730)
                .attr("y",182)
                .attr("font-size",12)
                .attr("fill","#E6E6FA");
            
            //Ligne vertical séparant répartition et age moyen
            var lineverticaldetail2 = d3.select("svg").append("line")
                        .attr("x1",840)
                        .attr("y1",168)
                        .attr("x2",840)
                        .attr("y2",280)
                        .attr("stroke","#f8e82f")
                        .attr("stroke-width",0.7);
            
            //Titre Age moyen            
            var titresport3 = d3.select("svg").append("text")
                .text("Age Moyen")
                .attr("x",890)
                .attr("y",182)
                .attr("font-size",12)
                .attr("fill","#E6E6FA");
            
            //Age moyen du sport    
            var age_moyen = d3.select("svg").append("text")
                .text(agemoyen)
                .attr("x",890)
                .attr("y",210)
                .attr("font-size",20)
                .attr("fill","#E6E6FA");
                
            //Titre plus jeune
            var plus_jeune = d3.select("svg").append("text")
                .text("Le plus jeune")
                .attr("x",860)
                .attr("y",240)
                .attr("font-size",12)
                .attr("fill","#E6E6FA");
            
            //Titre plus vieux    
            var plus_vieux = d3.select("svg").append("text")
                .text("Le plus vieux")
                .attr("x",860)
                .attr("y",260)
                .attr("font-size",12)
                .attr("fill","#E6E6FA");
             
            // Age plus jeune du sport
            var age_jeune = d3.select("svg").append("text")
                .text(plusjeune)
                .attr("x",960)
                .attr("y",240)
                .attr("font-size",12)
                .attr("fill","#E6E6FA");
            
            //Age plus vieux du sport   
            var age_vieux = d3.select("svg").append("text")
                .text(plusvieux)
                .attr("x",960)
                .attr("y",260)
                .attr("font-size",12)
                .attr("fill","#E6E6FA");
                
            // Ligne horizontale en dessous age  moyen
            var linehorizontaleage = d3.select("svg").append("line")
                        .attr("x1",860)
                        .attr("y1",220)
                        .attr("x2",1000)
                        .attr("y2",220)
                        .attr("stroke","#E6E6FA")
                        .attr("stroke-width",0.7);
        });
        //Dessine les hommes par tranches avec 2 lignes par tranche
        for (i=0;i<9;i++) {
        var absh=absinit;
            if (effpartrancheh[i]%2==0) { //Effectif pair
                for (eff=0;eff<(effpartrancheh[i]/2);eff++) {
                    var rect = d3.select("svg").append("rect") // Tracer le rectangle correspondant à un homme
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#E6E6FA");
                    absh=absh+cote+5; // Espace entre 2 hommes
                }
                listexhomme[i]=absh; //Met en mémoire le dernier homme de la tranche 
                ordh=ordh-cote-5; // permet de passer à la deuxieme ligne de la tranche
                absh=absinit;
                for (eff=(effpartrancheh[i]/2);eff<effpartrancheh[i];eff++) { //dessiner les hommmes sur la deuxième ligne de la tranche
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#E6E6FA");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            } else { //effectif impair
                for (eff=0;eff<(Math.floor(effpartrancheh[i]/2)+1);eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#E6E6FA");
                    absh=absh+cote+5;
                }
                listexhomme[i]=absh;
                ordh=ordh-cote-5;
                absh=absinit;
                for (eff=(Math.floor(effpartrancheh[i]/2)+1);eff<effpartrancheh[i];eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#E6E6FA");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            }
            ordh=ordh-5; //Espace entre les tranches
        }
        ordh=ordinit;
        for (i=0;i<9;i++) { //Trace traits verticaux pour séparer homme et femme
            if (listexhomme[i]!=absinit){
                var line = d3.select("svg").append("line")
                .attr("x1",listexhomme[i]+15)
                .attr("y1",ordh-5)
                .attr("x2",listexhomme[i]+15)
                .attr("y2",ordh-40)
                .attr("stroke","#E6E6FA")
                .attr("stroke-width",0.7);
            ordh=ordh-45;
            listexhomme[i]=listexhomme[i]+15;
            } else {
                ordh=ordh-25;
            }
        }
        ordh=ordinit;
        for (i=0;i<9;i++) { //Même chose avec les femmes
            var absh=listexhomme[i];
            if (effpartranchef[i]%2==0) {
                for (eff=0;eff<(effpartranchef[i]/2);eff++) {
                    console.log("Coucou");
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#E6E6FA");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
                absh=listexhomme[i];
                for (eff=(effpartranchef[i]/2);eff<effpartranchef[i];eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#E6E6FA");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            } else {
                for (eff=0;eff<(Math.floor(effpartranchef[i]/2)+1);eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#E6E6FA");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
                absh=listexhomme[i];
                for (eff=(Math.floor(effpartranchef[i]/2)+1);eff<effpartranchef[i];eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#E6E6FA");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            }
            ordh=ordh-5;
        }
    });
}


