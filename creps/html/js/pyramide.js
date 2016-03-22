$(function() {
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 1500 - margin.left - margin.right,
        height = 560 - margin.top - margin.bottom,
        absinit=170,
        listexhomme = [],  //Contient la dernière abscisses pour chaque tranche d'âge
        effpartrancheh=[], //Contient l'effectif masculin par tranche de tous les sports
        effpartranchef=[], //Contient l'effectif feminin par tranche de tous les sports
        ordh=680, //variable pour l'ordonnée initialé à 450
        //ordf=450,
        ordinit=680; // initialisation de l'ordonnée de la pyramide
        entretranche=17;
        entreligne=8;
        
    // Création du svf
    
    var svg = d3.select("#svgpyramidedesages") 
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
    
    // Fonction d'initialisation
    
    initialisation = function initialisation(){
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
                        dessinerhomme(absh,ordh);
                        absh=absh+cote+5; // Espace entre 2 hommes
                    }
                    listexhomme[i]=absh; //Met en mémoire le dernier homme de la tranche 
                    ordh=ordh-cote-entreligne-2; // permet de passer à la deuxieme ligne de la tranche
                    absh=absinit;
                    for (eff=(effpartrancheh[i]/2);eff<effpartrancheh[i];eff++) { //dessiner les hommmes sur la deuxième ligne de la tranche
                        dessinerhomme(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                } else { //effectif impair
                    for (eff=0;eff<(Math.floor(effpartrancheh[i]/2)+1);eff++) {
                        dessinerhomme(absh,ordh);
                        absh=absh+cote+5;
                    }
                    listexhomme[i]=absh;
                    ordh=ordh-cote-entreligne-2;
                    absh=absinit;
                    for (eff=(Math.floor(effpartrancheh[i]/2)+1);eff<effpartrancheh[i];eff++) {
                        dessinerhomme(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                }
                ordh=ordh-entretranche; //Espace entre les tranches
            }
            ordh=ordinit;
            for (i=0;i<9;i++) { //Trace traits verticaux pour séparer homme et femme
                if (listexhomme[i]!=absinit){
                    /*var line = d3.select("svg").append("line")
                    .attr("x1",listexhomme[i]+15)
                    .attr("y1",ordh-5)
                    .attr("x2",listexhomme[i]+15)
                    .attr("y2",ordh-40)
                    .attr("stroke","#00D68C")
                    .attr("fill","#00D68C")
                    .attr("stroke-width",0.7);*/
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
                        dessinerfemme(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                    absh=listexhomme[i];
                    for (eff=(effpartranchef[i]/2);eff<effpartranchef[i];eff++) {
                        dessinerfemme(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                } else {
                    for (eff=0;eff<(Math.floor(effpartranchef[i]/2)+1);eff++) {
                        dessinerfemme(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                    absh=listexhomme[i];
                    for (eff=(Math.floor(effpartranchef[i]/2)+1);eff<effpartranchef[i];eff++) {
                        dessinerfemme(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                }
                ordh=ordh-entretranche;
            }
        });
    }
    
    initialisation();
    
    dessinerfemme = function dessinerfemme(abscisse,ordonnee){
        var ajustement=5;
        var bonhomme = d3.select("#svgpyramidedesages").append("g")
            .attr("transform","scale(0.15 0.15)");
        var corpsfemme = d3.select("g").append("path")
            .attr("fill","#7C7C7C")
            .attr("d","M22.1,29L0.2,99.3c-0.2,0.7,0.4,1.4,1.3,1.4h11.1c0.4,0,0.7-0.1,0.9-0.3c1.9-1.6,10.7-8.4,20.2-0.1   c0.2,0.2,0.6,0.3,0.9,0.3h10.9c0.9,0,1.5-0.7,1.3-1.4L24.7,29L22.1,29z")
            .attr("transform","translate("+ajustement*abscisse+" "+ajustement*ordonnee+")");
        var ajustementcorpsfemme =d3.select("g").append("ellipse")
            .attr("fill","#7C7C7C")
            .attr("cx",ajustement*abscisse+23.5)
            .attr("cy",ajustement*ordonnee+99.7)
            .attr("rx",1.3)
            .attr("ry",0.9);
        var tetefemme = d3.select("g").append("circle")
            .attr("opacity",0.7)
            .attr("fill","#7C7C7C")
            .attr("cx",ajustement*abscisse+23.1)
            .attr("cy",ajustement*ordonnee+11.6)
            .attr("r",11.6);
    }
    

    dessinerfemmesport = function dessinerfemmesport(abscisse,ordonnee){
        var ajustement=5;
        var bonhomme = d3.select("#pyramidedesages").append("g")
            .attr("transform","scale(0.15 0.15)")
            .attr("class","blanc");
        var corpsfemme = d3.select("g").append("path")
            .attr("fill","white")
            .attr("d","M22.1,29L0.2,99.3c-0.2,0.7,0.4,1.4,1.3,1.4h11.1c0.4,0,0.7-0.1,0.9-0.3c1.9-1.6,10.7-8.4,20.2-0.1   c0.2,0.2,0.6,0.3,0.9,0.3h10.9c0.9,0,1.5-0.7,1.3-1.4L24.7,29L22.1,29z")
            .attr("transform","translate("+ajustement*abscisse+" "+ajustement*ordonnee+")")
            .attr("class","blanc");
        var ajustementcorpsfemme =d3.select("g").append("ellipse")
            .attr("fill","white")
            .attr("cx",ajustement*abscisse+23.5)
            .attr("cy",ajustement*ordonnee+99.7)
            .attr("rx",1.3)
            .attr("ry",0.9)
            .attr("class","blanc");
        var tetefemme = d3.select("g").append("circle")
            .attr("opacity",0.7)
            .attr("fill","white")
            .attr("cx",ajustement*abscisse+23.1)
            .attr("cy",ajustement*ordonnee+11.6)
            .attr("r",11.6)
            .attr("class","blanc");
    }
    
    dessinerhomme = function dessinerhomme(abscisse,ordonnee){
        var ajustement=5;
        var bonhomme = d3.select("#svgpyramidedesages").append("g")
            .attr("transform","scale(0.15 0.15)");
        var corpshomme = d3.select("g").append("path")
            .attr("fill","#7C7C7C")
            .attr("d","M24.8,99.8l21.9-75.9c0.2-0.8-0.4-1.5-1.3-1.5H34.3c-0.4,0-0.7,0.1-0.9,0.3c-1.9,1.7-10.7,9-20.2,0.1   c-0.2-0.2-0.6-0.4-0.9-0.4H1.3c-0.9,0-1.5,0.7-1.3,1.5l22.1,75.8L24.8,99.8z")
            .attr("transform","translate("+ajustement*abscisse+" "+ajustement*ordonnee+")");
        var ajustementcorpshomme =d3.select("g").append("ellipse")
            .attr("fill","#7C7C7C")
            .attr("cx",ajustement*abscisse+23.5)
            .attr("cy",ajustement*ordonnee+99.7)
            .attr("rx",1.3)
            .attr("ry",0.9);
        var tetehomme = d3.select("g").append("circle")
            .attr("opacity",0.7)
            .attr("fill","#7C7C7C")
            .attr("cx",ajustement*abscisse+23.1)
            .attr("cy",ajustement*ordonnee+11.6)
            .attr("r",11.6);
    }
    dessinerhommesport = function dessinerhommesport(abscisse,ordonnee){
        var ajustement=5;
        var bonhomme = d3.select("#svgpyramidedesages").append("g")
            .attr("transform","scale(0.15 0.15)")
            .attr("class","blanc");
        var corpshomme = d3.select("g").append("path")
            .attr("fill","white")
            .attr("d","M24.8,99.8l21.9-75.9c0.2-0.8-0.4-1.5-1.3-1.5H34.3c-0.4,0-0.7,0.1-0.9,0.3c-1.9,1.7-10.7,9-20.2,0.1   c-0.2-0.2-0.6-0.4-0.9-0.4H1.3c-0.9,0-1.5,0.7-1.3,1.5l22.1,75.8L24.8,99.8z")
            .attr("transform","translate("+ajustement*abscisse+" "+ajustement*ordonnee+")")
            .attr("class","blanc");
        var ajustementcorpshomme =d3.select("g").append("ellipse")
            .attr("fill","white")
            .attr("cx",ajustement*abscisse+23.5)
            .attr("cy",ajustement*ordonnee+99.7)
            .attr("rx",1.3)
            .attr("ry",0.9)
            .attr("class","blanc");
        var tetehomme = d3.select("g").append("circle")
            .attr("opacity",0.7)
            .attr("fill","white")
            .attr("cx",ajustement*abscisse+23.1)
            .attr("cy",ajustement*ordonnee+11.6)
            .attr("r",11.6)
            .attr("class","blanc");
    }
    
     
    var tinit=510;
    var inttexte=50;
    
    //Indiciation des tranches
    
    var t1 = d3.select("#svgpyramidedesages").append("text") 
        .text("10 - 14")
        .attr("x",70)
        .attr("y",tinit)
        .attr("font-size",14)
        .attr("fill","#00D68C");
        
    var t2 = d3.select("#svgpyramidedesages").append("text")
        .text("15 - 19")
        .attr("x",70)
        .attr("y",tinit-inttexte)
        .attr("font-size",14)
        .attr("fill","#00D68C");
        
    var t3 = d3.select("#svgpyramidedesages").append("text")
        .text("20 - 24")
        .attr("x",70)
        .attr("y",tinit-2*inttexte)
        .attr("font-size",14)
        .attr("fill","#00D68C");
    
    var t4 = d3.select("#svgpyramidedesages").append("text")
        .text("25 - 29")
        .attr("x",70)
        .attr("y",tinit-3*inttexte)
        .attr("font-size",14)
        .attr("fill","#00D68C");
        
    var t5 = d3.select("#svgpyramidedesages").append("text")
        .text("30 - 34")
        .attr("x",70)
        .attr("y",tinit-4*inttexte)
        .attr("font-size",14)
        .attr("fill","#00D68C");
        
    var t6 = d3.select("#svgpyramidedesages").append("text")
        .text("35 - 39")
        .attr("x",70)
        .attr("y",tinit-5*inttexte)
        .attr("font-size",14)
        .attr("fill","#00D68C");
    
    var t7 = d3.select("#svgpyramidedesages").append("text")
        .text("40 - 44")
        .attr("x",70)
        .attr("y",tinit-6*inttexte)
        .attr("font-size",14)
        .attr("fill","#00D68C");
        
    var t8 = d3.select("#svgpyramidedesages").append("text")
        .text("45 - 49")
        .attr("x",70)
        .attr("y",tinit-7*inttexte)
        .attr("font-size",14)
        .attr("fill","#00D68C");
        
    var t9 = d3.select("#svgpyramidedesages").append("text")
        .text("50 et +")
        .attr("x",70)
        .attr("y",tinit-8*inttexte)
        .attr("font-size",14)
        .attr("fill","#00D68C");
    
    
    
    // Titre "Age'
        
    var age = d3.select("#svgpyramidedesages").append("text")
        .text("AGE")
        .attr("x",80)
        .attr("y",42)
        .attr("font-size",14)
        .attr("fill","#00D68C");
   
    //Ligne horizontale en dessous de age
    var linehorizontaletitreage = d3.select("#svgpyramidedesages").append("line")
        .attr("x1",73)
        .attr("y1",52)
        .attr("x2",117)
        .attr("y2",52)
        .attr("stroke","#00D68C")
        .attr("stroke-width",0.3);
      
     //Titre "Pyramide des ages"  
    var titrepyr = d3.select("#svgpyramidedesages").append("text")
        .text("PYRAMIDE DES AGES ET DES SEXES")
        .attr("x",540)
        .attr("y",42)
        .attr("font-size",14)
        .attr("fill","#00D68C");
    
    var textepyr = d3.select("#svgpyramidedesages").append("text")
        .text("La pyramide des âges présentée ici permet d'avoir un aperçu global et en même temps très préçis sur l'âge et le sexe des ")
        .attr("x",540)
        .attr("y",62)
        .attr("width",20)
        .attr("font-size",14)
        .attr("fill","#E6E6FA");
    
       var textepyr = d3.select("#svgpyramidedesages").append("text")
        .text("personnes listées à haut niveau dans la région pays de la Loire. Elle permet de prendre en compte une discipline particulière")
        .attr("x",540)
        .attr("y",82)
        .attr("width",20)
        .attr("font-size",14)
        .attr("fill","#E6E6FA");
 
    
    var textepyr = d3.select("#svgpyramidedesages").append("text")
        .text("qui sera détaillée par le nombre de listés,leur âge moyen et la répartition féminine et masculine globale mais aussi pour chaque")
        .attr("x",540)
        .attr("y",102)
        .attr("width",20)
        .attr("font-size",14)
        .attr("fill","#E6E6FA");    
        
    var textepyr = d3.select("#svgpyramidedesages").append("text")
        .text("tranche d'âge. Par ce moyen intuitif nous pouvons faire passer un maximum d'informations majeures.")
        .attr("x",540)
        .attr("y",122)
        .attr("width",20)
        .attr("font-size",14)
        .attr("fill","#E6E6FA");    
     
    //Ligne horizontale haute   
    var linehaute = d3.select("#svgpyramidedesages").append("line")
                .attr("x1",0)
                .attr("y1",22)
                .attr("x2",10000)
                .attr("y2",22)
                .attr("stroke","#00D68C")
                .attr("stroke-width",0.7);
    
    //Ligne horizontale basse
    var linebasse = d3.select("#svgpyramidedesages").append("line")
                .attr("x1",0)
                .attr("y1",550)
                .attr("x2",10000)
                .attr("y2",550)
                .attr("stroke","#00D68C")
                .attr("stroke-width",0.7);  
    

    
    specification = function specification(sport){
        $('.blanc').each(function(){
           $(this).remove(); 
        });
        $.getJSON("data/pyramide.json", function(donnees) {
            var absh=absinit;
            var ordh=ordinit;
            var effectifsporth=[];
            var effectifsportf=[];
            var nblicencie=0;
            var nbhomme=0;
            var nbfemme=0;
            var agemoyen;
            var plusjeune;
            var plusvieux;
            var i;
            $.each(donnees,function(key, value){
                if (sport==key) {
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
                    console.log(effectifsporth);
                    console.log(effectifsportf);
                    //Titre du sport 
                    var titresport = d3.select("#svgpyramidedesages").append("text")
                        .text(key)
                        .attr("x",540)
                        .attr("y",142+40)
                        .attr("font-size",14)
                        .attr("fill","#00D68C")
                        .attr("class","blanc");
                   
                   //Trait en dessous le titre du sport     
                    var line = d3.select("#svgpyramidedesages").append("line")
                                .attr("x1",540)
                                .attr("y1",152+40)
                                .attr("x2",1000)
                                .attr("y2",152+40)
                                .attr("stroke","#00D68C")
                                .attr("stroke-width",0.7)
                                .attr("class","blanc");
                                
                    
                    //Titre Nombre de licenciés
                    var titresport1 = d3.select("#svgpyramidedesages").append("text")
                        .text("Nombre de licenciés")
                        .attr("x",560)
                        .attr("y",182+40)
                        .attr("font-size",12)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                    
                    //Nombre total de licenciés    
                    var effectiftotalsport = d3.select("#svgpyramidedesages").append("text")
                        .text(nblicencie)
                        .attr("x",560)
                        .attr("y",240+40)
                        .attr("font-size",40)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                    
                    //Nombre d'hommes pratiquant ce sport    
                    var effectifhommesport = d3.select("#svgpyramidedesages").append("text")
                        .text(nbhomme)
                        .attr("x",630)
                        .attr("y",230+40)
                        .attr("font-size",20)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                    
                    dessinerhommesport(875,290+50);
                    dessinerfemmesport(875,330+50);
                    
                     //Nombre de femmes pratiquant ce sport
                    var effectiffemme= d3.select("#svgpyramidedesages").append("text")
                        .text(nbfemme)
                        .attr("x",630)
                        .attr("y",260+40)
                        .attr("font-size",20)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                    
                    //Ligne vertical séparant licencié et répartition
                    var lineverticaldetail = d3.select("#svgpyramidedesages").append("line")
                                .attr("x1",690)
                                .attr("y1",168+40)
                                .attr("x2",690)
                                .attr("y2",280+40)
                                .attr("stroke","#00D68C")
                                .attr("stroke-width",0.7)
                                .attr("class","blanc");
                    
                    // Titre répartition
                    var titresport2 = d3.select("#svgpyramidedesages").append("text")
                        .text("Répartition")
                        .attr("x",730)
                        .attr("y",182+40)
                        .attr("font-size",12)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                        
                    /*var effectifhommesport = d3.select("#svgpyramidedesages").append("text")
                        .text(nbhomme/(nbhomme+nbfemme)+"%")
                        .attr("x",730)
                        .attr("y",230+40)
                        .attr("font-size",20)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");*/
                    
                    
                    //Ligne vertical séparant répartition et age moyen
                    var lineverticaldetail2 = d3.select("#svgpyramidedesages").append("line")
                                .attr("x1",840)
                                .attr("y1",168+40)
                                .attr("x2",840)
                                .attr("y2",280+40)
                                .attr("stroke","#00D68C")
                                .attr("stroke-width",0.7)
                                .attr("class","blanc");
                    
                    //Titre Age moyen            
                    var titresport3 = d3.select("#svgpyramidedesages").append("text")
                        .text("Age Moyen")
                        .attr("x",890)
                        .attr("y",182+40)
                        .attr("font-size",12)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                    
                    //Age moyen du sport    
                    var age_moyen = d3.select("#svgpyramidedesages").append("text")
                        .text(agemoyen)
                        .attr("x",890)
                        .attr("y",210+40)
                        .attr("font-size",20)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                        
                    //Titre plus jeune
                    var plus_jeune = d3.select("#svgpyramidedesages").append("text")
                        .text("Le plus jeune")
                        .attr("x",860)
                        .attr("y",240+40)
                        .attr("font-size",12)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                    
                    //Titre plus vieux    
                    var plus_vieux = d3.select("#svgpyramidedesages").append("text")
                        .text("Le plus vieux")
                        .attr("x",860)
                        .attr("y",260+40)
                        .attr("font-size",12)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                     
                    // Age plus jeune du sport
                    var age_jeune = d3.select("#svgpyramidedesages").append("text")
                        .text(plusjeune)
                        .attr("x",960)
                        .attr("y",240+40)
                        .attr("font-size",12)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                    
                    //Age plus vieux du sport   
                    var age_vieux = d3.select("#svgpyramidedesages").append("text")
                        .text(plusvieux)
                        .attr("x",960)
                        .attr("y",260+40)
                        .attr("font-size",12)
                        .attr("fill","#E6E6FA")
                        .attr("class","blanc");
                        
                    // Ligne horizontale en dessous age  moyen
                    var linehorizontaleage = d3.select("#svgpyramidedesages").append("line")
                                .attr("x1",860)
                                .attr("y1",220+40)
                                .attr("x2",1000)
                                .attr("y2",220+40)
                                .attr("stroke","#E6E6FA")
                                .attr("stroke-width",0.7)
                                .attr("class","blanc");
                    
                    
                                
                }
            });
            ordh=ordinit;
            for (i=0;i<9;i++) { 
                absh=absinit;
                if (effectifsporth[i]%2==0) {
                    for (eff=0;eff<(effectifsporth[i]/2);eff++) {
                        dessinerhommesport(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                    absh=absinit;
                    for (eff=(effectifsporth[i]/2);eff<effectifsporth[i];eff++) {
                        dessinerhommesport(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                } else {
                    for (eff=0;eff<(Math.floor(effectifsporth[i]/2)+1);eff++) {
                        dessinerhommesport(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                    absh=absinit;
                    for (eff=(Math.floor(effectifsporth[i]/2)+1);eff<effectifsporth[i];eff++) {
                        dessinerhommesport(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                }
                ordh=ordh-entretranche;
            }
            ordh=ordinit;
            for (i=0;i<9;i++) { //Même chose avec les femmes
                absh=listexhomme[i];
                if (effectifsportf[i]%2==0) {
                    for (eff=0;eff<(effectifsportf[i]/2);eff++) {
                        dessinerfemmesport(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                    absh=listexhomme[i];
                    for (eff=(effectifsportf[i]/2);eff<effectifsportf[i];eff++) {
                        dessinerfemmesport(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                } else {
                    for (eff=0;eff<(Math.floor(effectifsportf[i]/2)+1);eff++) {
                        dessinerfemmesport(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                    absh=listexhomme[i];
                    for (eff=(Math.floor(effectifsportf[i]/2)+1);eff<effectifsportf[i];eff++) {
                        dessinerfemmesport(absh,ordh);
                        absh=absh+cote+5;
                    }
                    ordh=ordh-cote-entreligne-2;
                }
                ordh=ordh-entretranche;
            }
        });
    }
});





