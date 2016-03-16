$("#container2").height($("#container1").height());
var selected = false;
        var svg = d3.select("#svg").attr("preserveAspectRatio","none");
        svg1 = svg.selectAll("polygon").on("click",clickHandler);
        var i = 1;
        svg2 = svg.selectAll("circle").on("mouseover",mouseOverHandler).on("mouseout",mouseOutHandler).on("click",clickHandler);
        function zoom() {
            //console.log("translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            svg1.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            svg2.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }; 
        
        function mouseOverHandler(){
            //var loc = cursorPoint(e);
            //console.log(this.id);
            var pointId = this.id;
            if(selected){
                return;
            }
            else{
                $("#infos").stop();
                $("#infos").css("opacity",0);
                $("#infos").css("visibility","visible");
                var fill = $(this).parent().attr("fill");
                //$("#infos").css("background", fill);
                $("#infos").animate({opacity: 1},1000);
                
                //afficher les donnees....
                var result = $.grep(data, function(e){return e.id == pointId; });
                if(result[0]){                   
                    $("#name").text(result[0].name).css("color",fill);
                    $("#address").text(result[0].address);
                    $("#information").text(result[0].infomation.join("\n"));
                };
            };
            
            
        };
        
        function mouseOutHandler(){
            
            //d3.select("#"+this.id).attr("transform","translate(0,0)scale(1)");
            //console.log(this);
            if(selected){
                return;
            }
            else{
                $("#infos").stop();
                $("#infos").css("opacity",0);               
                $("#infos").css("visibility","hidden");
            }
        };
        var currentCircle;
       function clickHandler(){
           //console.log(this.id);
           //var currentCircle;
           if(this.id){
               var fill = $(this).parent().attr("fill");
               if(typeof currentCircle != "undefined"){
                   //console.log(currentCircle);
                   $(currentCircle).attr("r",7.8);
               }
               //changing infos
               $("#infos").stop();
               $("#infos").css("opacity",0);               
               $("#infos").css("visibility","hidden");
               $("#infos").css("visibility","visible");
               //$("#infos").css("background", fill);
               $("#infos").animate({opacity: 1},1000);
               
               //afficher les donnees....
               var pointId = this.id;
                var result = $.grep(data, function(e){return e.id == pointId; });
                if(result[0]){                   
                    $("#name").text(result[0].name).css("color",fill);
                    $("#address").text(result[0].address);
                    $("#information").text(result[0].infomation.join("\n"));
                };
               
               
               d3.selectAll("circle").attr("fill","#c0c0c0");
               d3.select("#" + this.id).attr("fill", fill).attr("r",10);
               currentCircle = this;
               //$(this).attr("selected",true);
               selected = true;
           }
           else{
               $("#infos").css("visibility","hidden");
               d3.selectAll("circle").attr("fill",$(this).parent().attr("fill")).attr("r",7.8);
               //d3.selectAll("circle").attr("selected",false);
               selected = false;
           }
       };


var data = [
    {
        name : "Plateau d’évolution Trentemoult",
        id : "espace1",
        address : "Place des Filets 44403 Rezé",
        infomation : ["2 paniers de basket"]
    },
    {
        name : "Aire de jeux Parc Lancelot",
        id : "espace2",
        address : "Rue Lancelot 44403 Rezé",
        infomation : ["1,3 hectares","Jeux pour enfants : mini-foot et hand"]
    },
    {
        name : "Plateau d’évolution Yvonne et Alexandre-Plancher",
        id : "espace3",
        address : "Rue Camille Jouis 44400 Rezé",
        infomation : ["Hand/mini-foot","Basket"]
    },
    {
        name : "Aire de jeux Saint-Lupien",
        id : "espace4",
        address : "Rue Pictons 44400 Rezé",
        infomation : ["1 panneau de basket","2 buts de football à 7"]
    },
    {
        name : "Aire de jeux Le Bois de Rezé",
        id : "espace5",
        address : "Allée Georges-Bénezet 44400 Rezé",
        infomation : ["2 buts de football","2 paniers de baskets"]
    },
    {
        name : "Courts de tennis ",
        id : "espace6",
        address : "Avenue Léon Blum 44400 Rezé",
        infomation : ["5 courts"]
    },
    {
        name : "Plateau d’évolution - Stade Léo-Lagrange",
        id : "espace7",
        address: "Avenue Léon Blum 44400 Rezé",
        infomation : ["Beach-volley/soccer","Plateau multi-sports","Anneau de roller"]
    },
    {
        name : "Aire de pétanque",
        id : "espace8",
        address : "Place du Pays-de-Retz 44400 Rezé",
        infomation : [""]
    },
    {
        name : "Aire de jeux Square Rigolo",
        id : "espace9",
        address : "Square Rigolo 44400 Rezé",
        infomation : ["2 panneaux de combi hand/basket","2 tables de ping-pong"]
    },
    {
        name : "Plateau d’évolution Château-Nord ",
        id : "espace10",
        address : "11 Rue Julien Douillard 44400 Rezé",
        infomation : []
    },
    {
        name : "Plateau d’évolution “City Stade” square Rolland ",
        id : "espace11",
        address : "Allée Romain Rolland 44400 Rezé",
        infomation : ["2 mini-buts brésiliens combi hand/basket"]
    },
    {
        name : "Plateau d’évolution Château-Sud ",
        id : "espace12",
        address : "Place Jean-Perrin 44400 Rezé",
        infomation : ["2 buts de hand/mini-foot","4 panneaux de basket"]
    },
    {
        name : "Aire de jeux Square Charles-richard ",
        id : "espace13",
        address : "Square Charles Richard 44400 Rezé",
        infomation : ["1 panneau de basket"]
    },
    {
        name : "Plateau d’évolution Roger-Salengro",
        id : "espace14",
        address : "Rue Alexandre Huchon 44400 Rezé",
        infomation : ["2 buts de hand/football"]
    },
    {
        name : "Plateau d’évolution Port-au-Blé ",
        id : "espace15",
        address : "Avenue André-Malraux 44400 Rezé",
        infomation : ["2 buts de hand/football"]
    },
    {
        name : "Aire de jeux Barbonnerie ",
        id : "espace16",
        address : "Rue de la Barbonnerie 44400 Rezé",
        infomation : ["2 buts de football"]
    },
    {
        name : "Site de Pêche",
        id : "espace17",
        address : "Quai de la Verdure 44400 Rezé",
        infomation : []
    },
    {
        name : "Aire de jeux Chêne-Gala",
        id : "espace18",
        address : "Rue des Couteaux 44400 Rezé",
        infomation : ["2 buts de hand","4 buts de football"]
    },
    {
        name : "Plateau d’évolution Julien-Douillard",
        id : "espace19",
        address: "11 Rue Julien Douillard 44400 Rezé",
        infomation : []
    },
    {      
        name : "Plateaux d’évolution Évelyne-Crétual ",
        id : "espace20",
        address : "Rue des Landes-Belleville 44400 Rezé",
        infomation : ["Hand/mini-foot","Basket","Volley","Piste de course","Aire de lancer","Saut en longueur"]
    },
    {
        name :"Aire de pétanque La Classerie",
        id : "espace21",
        address : "Place du Pays-de-Retz 44400 Rezé",
        infomation : []
    },
    {
        name : "Plateau d’évolution Chêne-Creux ",
        id : "espace22",
        address : "Rue des Landes-Belleville 44400 Rezé",
        infomation : ["2 panneaux de basket","2 buts de hand/mini-foot"]
    },
    {
        name : "Aire de jeux La Lande Saint-Pierre ",
        id : "espace23",
        address : "Rue de la Lande Saint-Pierre 44400 Rezé",
        infomation : ["Football"]
    },
    {
        name : "Plateaux d’évolution Ouche-Dinier ",
        id : "espace24",
        address : "Rue de l’Ouche-Dinier 44400 Rezé",
        infomation : ["Tennis","Hand/mini-foot","Basket"]
    },
    {
        name : "Aire de jeux Jaunais-Blordière",
        id : "espace25",
        address : "Rue du Jaunais 44400 Rezé",
        infomation : ["1 panneau de Basket"]
    },
    {
        name : "Site de pêche",
        id : "espace26",
        address : "Quai Léon Sécher 44400 Rezé",
        infomation : [""]
    },
    {
        name : "Aire de jeux Chemin-Bleu",
        id :"espace27",
        address :"Chemin-Bleu 44400 Rezé",
        infomation : ["2 buts de football"]
    },
    {
        name : "Plateau d’évolution Ragon ",
        id :"espace28",
        address : "Rue du Vivier 44400 Rezé",
        infomation : ["Hand/mini-foot","Basket"]
    },
    {
        name : "Court de tennis",
        id : "espace29",
        address : "Rue des Poyaux 44400 Rezé",
        infomation : ["Stade de la Robinière"]
    },
    {
        name : "Terrain de boules lyonnaises",
        id : "espace30",
        address : "Rue des Poyaux 44400 Rezé",
        infomation : ["stade de la Robinière"]
    },
    {
        name : "Aire de jeux Parc de Praud ",
        id : "espace31",
        address : "Rue de la Butte de Praud 44400 Rezé",
        infomation :["2 buts de football"]
    },
    {
        name : "Aire de jeux Le Genêtais",
        id : "espace32",
        address : "Rue Cassiopée 44400 Rezé",
        infomation : ["2 buts de handball"]
    },
    {
        name : "Aire de jeux Clos des Iles",
        id : "espace33",
        address : "Rue Robert Louis-Stevenson 44400 Rezé",
        infomation : ["2 panneaux de Basket","2 buts de football à 7"]
    },
    {
        name : "Patinoire",
        id : "piscine1",
        address : "Rue de la Trocardière 44400 Rezé",
        infomation : []
    },
    {
        name : "Piscine Victor-Jara",
        id : "piscine2",
        address:"5 Avenue Léon Blum 44400 Rezé",
        infomation : []
    },
    {
        name : "Gymnase Alexandre-Plancher",
        id : "gymane1",
        address : "7 Rue Camille-Jouis",
        infomation : ["300m2","Vestiaire","Plateau d’évolution"]
    },
    {
        name : "Gymnase Cités-Unies ",
        id : "gymane2",
        address : "8 Avenue Léon Blum",
        infomation : ["Salle 24x45,5","Salle de gym 210m2","Salle sports de combats 210m2","Tribunes 300 personnes","Vestiaires"]
    },
    {
        name : "Salle Sportive Métropolitaine",
        id : "gymane3",
        address : "Rue de la Trocardière",
        infomation : ["Salle centrale de basket/volley/handball 3000m2","Espaces d’échauffement 800m2","Jauge de 4238 spectateurs assis sur 2 niveaux","Salle annexes","Vestiaires"]
    },
    /*{
        name = "",
        id = "gymane4",
        address = "",
        infomation = []
    },*/
    {
        name : "Gymnase Port-au-Blé ",
        id : "gymane5",
        address : "Avenue André-Malraux",
        infomation : ["Salle multisports 1000m2","Espace de surface artificielle d’escalade","Salle de gymnastique artistique","Plateau d’évolution","Vestiaires"]
    },
    {
        name : "Gymnase Julien-Douillard ",
        id : "gymane6",
        address : "11 rue Julien-Douillard",
        infomation : ["Salle 20x30","Tribune 80 personnes amovible","Plateau d’évolution","Vestiaires"]
    },
    {
        name : "Gymnase Roger-Salengro",
        id : "gymane7",
        address : "Rue Alexandre-Huchon",
        infomation : ["Salle 300m2","Plateau d’évolution","Vestiaires"]
    },
    {
        name : "Gymnase Château-Nord ",
        id : "gymane8",
        address : "Allée de Provence",
        infomation : ["Salle 29,6x17","Plateau d’évolution","Vestiaires"]
    },
    {
        name : "Gymnase Lucien-Cavalin ",
        id : "gymane9",
        address : "4 rue des Frères-Lumières",
        infomation : ["Salle 32x20,48","Tribune 120 personnes amovible","Plateau d’évolution","Vestiaires"]
    },
    {
        name : "Gymnase Lysiane-et-Michel-Liberge",
        id : "gymane10",
        address : "11 rue de la Galarnière",
        infomation : ["Salle multisport 800 m² avec gradins","Salle judo/haïkido 595m2","Salle de boxe 595m2","Salle de musculation 160m2","Vestiaires"]
    },
    {
        name : "Gymnase Évelyn-Cretual",
        id :"gymane11",
        address : "12 rue des Déportés",
        infomation : ['Salle 24x44',"Salle de convivialité de 97m2","Tribune de 560 personnes","Plateau d’évolution","Vestiaires"]
    },
    {
        name : "Gymnase Chêne-Creux ",
        id : "gymane12",
        address : "Rue des Landes-Belleville",
        infomation : ["Salle 300m2","Plateau d’évolution","Vestiaires"]
    },
    {
        name : "Gymnase Arthur-Dugast ",
        id : "gymane13",
        address : "22 Boulevard Jean-Monet",
        infomation : ["* Salle omnisports 1100m2","Salle de gym 210m2","Salle de convivialité 80m2","Tribune de 500 sièges","Tribune amovible de 600 personnes","Vestiaires"]
    },
    {
        name : "Gymnase Andrée-Perrichon (Ouche-Dinier) ",
        id : "gymane14",
        address : "1 rue du Parc-Ferrand",
        infomation : ["Salle 22x44","Tribune 300 personnes","Plateau d’évolution","Vestiaires"]
    },
    {
        name : "Stade La Robinière ",
        id : "stade1",
        address : "Rue de la Robinière",
        infomation :["2 terrains en herbe","1 terrain stabilisé","1 terrain synthétique","2 terrains de rugby","2 courts de tennis","Boulodrome couvert et terrains de boules extérieurs","1 swim golf","Vestiaires"]
    },
    {
        name : "Stade Léo-Lagrange ",
        id : "stade2",
        address : "Avenue Léon-Blum",
        infomation : ["2 terrains en herbe","2 terrains stabilisés","1 terrain synthétique","1 piste d’athlétisme","1 terrain de hat-trick","5 courts de tennis","2 terrains de beach volley/sand ball","1 anneau de roller","Tribunes de 500 personnes","1 parvis face au terrain d’honneur","Vestiaires"]
    },
    {
        name : "Centre Nautique Sèvre et Loire ",
        id :"equip1",
        address : "Rude Codet",
        infomation : ["Voile/Aviron","Canoë/kayak"]
    },
    {
        name : "Halles de tennis",
        id : "equip2",
        address : "Avenue Léon blum",
        infomation : ["Stade Léo-Lagrange"]
    },
    {
        name : "Académie de billard rezéenne",
        id : "equip3",
        address : "26 rue Félix Faure",
        infomation : []
    },
    {
        name : "Boulodrome René-Figureau",
        id : "equip4",
        address :"Stade de la Robinière ",
        infomation : ["Rue de la Robinière"]
    },
    {
        name : "Stand de tir Hubert-Le Gohebel et Pas de tir à l’arc",
        id : "equip5",
        address : "Rue des Poyaux",
        infomation :[]
    }
];

