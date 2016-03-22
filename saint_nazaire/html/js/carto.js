$(function () {
    
   var idCategorie = null;
   var idAdresse = null;
    
    var adde={"Bois_Joalland":"Bois Joalland",
    "Guindreff":"Guindreff",
    "Bassin_de_l_x27_étang":"bassin de l'étang",
    "Villès_Martin":"Villes Martin",
    "Porcé":"Porcé",
    "Port_de_saint_nazaire":"Port de saint-Nazire",
    "SNSM":"SNSM station Pornichet",
    "Parc_des_sports":"parc des sports",
    "Parc_Paysager":"parc paysager",
    "Port_de_Gavy_x2C__Virechat_x2C__Trébézy":"Cale du port de Gavy à Trébézy",
    "Jaunais":"Jaunais",
    "Saint-Marc":"Saint-Marc",
    "Courance_1_":"Courance",
    "Port_de_Méan_1_":"Cale du Port de Méan"};
    
    var idA=["Bois_Joalland",
    "Guindreff",
    "Bassin_de_l_x27_étang",
    "Villès_Martin",
    "Porcé",
    "Port_de_saint_nazaire",
    "SNSM",
    "Parc_des_sports",
    "Parc_Paysager",
    "Port_de_Gavy_x2C__Virechat_x2C__Trébézy",
    "Jaunais",
    "Saint-Marc",
    "Courance_1_",
    "Port_de_Méan_1_"];
    
    for (var i=0; i<idA.length;i+=1) {
         $("#" + idA[i]).click(function () {
             idAdresse=$(this).attr("id");
             afficherDetails();
        })
    }
    
    
    
    var tab = ["peche","Kayak","planche-a-voile","plaisance","Prevention","Surf","Voile","Plonge"];
    for (var i=0; i<tab.length;i+=1) {
         $("#" + tab[i]).click(function () {
             idCategorie = $(this).attr("id");
             for (var j = 0; j < tab.length; j += 1){  
                if ($(this).attr("id") !== tab[j]){
                    $("."+tab[j]).css("display","none");
                }
             }
             $("."+$(this).attr("id")).css("display","block");
         }); 
    }
    document.getElementById("TOUS").onclick = function () {
    // idCategorie = null;
        Total();
    };
    function Total() {
            $(".peche").css("display","block");
            $(".Kayak").css("display","block");
            $(".planche-a-voile").css("display","block");
            $(".plaisance").css("display","block");
            $(".Prevention").css("display","block");
            $(".Surf").css("display","block");
            $(".Voile").css("display","block");
            $(".Plonge").css("display","block");
    }
    
    function afficherDetails(){
        var elementSelect = pratiques.filter(function (pratique){
            return pratique.categorie===idCategorie && pratique.Adresse.some(function (Adresse){
                return Adresse===adde[idAdresse];})
        });
        $("#detail").empty();
        for(var i=0 ; i<elementSelect.length ; i+=1){
            $("#detail").append("<p> Disciplines :"+elementSelect[i].Disciplines+"</p>");
            $("#detail").append("<p> Organisateur ou pratique libre :"+elementSelect[i]["Organisateur ou pratique libre"]+"</p>");
            $("#detail").append("<p> Usagers à l'année :"+elementSelect[i]["Usagers a l'annee"]+"</p>");
            $("#detail").append("<p> Adresse :"+adde[idAdresse]+"</p>");
            $("#detail").append("<br/>");
            
            
        }
        
    }
    
    

    var pratiques = [
  { 
    "categorie":"Voile",
    "Disciplines": "Voile non habitable",
    "Organisateur ou pratique libre": "Ville de Saint-Nazaire (direction des sports)",
    "Usagers a l'annee": 190,
    "Adresse":["Bois Joalland","Villes Martin"]
  },
  {
    "categorie":"Voile",
    "Disciplines": "Voile non habitable",
    "Organisateur ou pratique libre": "Snos Voile",
    "Usagers a l'annee": 144,
    "Adresse":["Bois Joalland"]
  },
  {
    "categorie":"Voile",
    "Disciplines": "Voile non habitable",
    "Organisateur ou pratique libre": "Pratique libre",
    "Usagers a l'annee": 100,
    "Adresse":["Villes Martin"]
    },
  {
    "categorie":"planche-a-voile",
    "Disciplines": "Planche à voile/speedsail",
    "Organisateur ou pratique libre": "Ville de Saint-Nazaire (direction des sports)",
    "Usagers a l'annee": 100,
    "Adresse": ["Bois Joalland","Villes Martin"]
  },
  {
    "categorie":"planche-a-voile",
    "Disciplines": "Planche à voile/speedsail",
    "Organisateur ou pratique libre": "Pratique libre",
    "Usagers a l'annee": 50,
    "Adresse":["Courance","Villes Martin","Jaunais"]
  },
  {
    "categorie":"plaisance",
    "Disciplines": "Plaisance (voile et moteur)",
    "Organisateur ou pratique libre": "Amicale des plaisanciers du port de Méan",
    "Usagers a l'annee": 40,
    "Adresse": ["Cale du Port de Méan"]
  },
  {
    "categorie":"plaisance",
    "Disciplines": "Plaisance (voile et moteur)",
    "Organisateur ou pratique libre": "Association nautique de Gavy",
    "Usagers a l'annee": 200,
    "Adresse": ["Cale du port de Gavy à Trébézy"]
  },
  {
    "categorie":"plaisance",
    "Disciplines": "Plaisance (voile et moteur)",
    "Organisateur ou pratique libre": "Société Nautique Saint-Nazaire Port Désiré",
    "Usagers a l'annee": 200,
    "Adresse": ["Cale du port de Gavy à Trébézy"],
  },
  {
    "categorie":"plaisance",
    "Disciplines": "Plaisance (voile et moteur)",
    "Organisateur ou pratique libre": "Association Promotion Difference",
    "Usagers a l'annee": 1320,
    "Adresse": ["Jaunais"],
  },
  {
    "categorie":"plaisance",
    "Disciplines": "Plaisance (voile et moteur)",
    "Organisateur ou pratique libre": "Pratique libre",
    "Usagers a l'annee": 1000,
    "Adresse": ["Cale du Port de Méan","Jaunais","Cale du port de Gavy à Trébézy"]
  },
  {
    "categorie":"peche",
    "Disciplines": "Peche embarquee et bord de mer\n(hors peche a pied)",
    "Organisateur ou pratique libre": "Saint-Nazaire peche en mer",
    "Usagers a l'annee": 21,
    "Adresse": ["Jaunais"]
  },
  { "categorie":"peche",
    "Disciplines": "Peche embarquee et bord de mer\n(hors peche a pied)",
    "Organisateur ou pratique libre": "SKAL",
    "Usagers a l'annee": 60,
    "Adresse": ["Jaunais"]
  },
  { "categorie":"peche",
    "Disciplines": "Peche embarquee et bord de mer\n(hors peche a pied)",
    "Organisateur ou pratique libre": "Orphie Club Nazairien",
    "Usagers a l'annee": 37,
    "Adresse": ["Jaunais"]
  },
  { "categorie":"peche",
    "Disciplines": "Peche embarquee et bord de mer\n(hors peche a pied)",
    "Organisateur ou pratique libre": "Pratique libre",
    "Usagers a l'annee": 500,
    "Adresse": ["Jaunais"]
  },
  { "categorie":"peche",
    "Disciplines": "Peche en eau douce",
    "Organisateur ou pratique libre": "La Gaule Nazairienne",
    "Usagers a l'annee": 1115,
    "Adresse":[ "Bois Joalland","Guindreff","bassin de l'étang"]
  },
  { "categorie":"peche",
    "Disciplines": "Peche en eau douce",
    "Organisateur ou pratique libre": "Pratique libre",
    "Usagers a l'annee": 100,
    "Adresse":["Bois Joalland","Guindreff","bassin de l'étang","parc paysager"]
  },
  {
    "categorie":"Kayak",
    "Disciplines": "Kayak de mer",
    "Organisateur ou pratique libre": "Snos Canoe kayak",
    "Usagers a l'annee": 40,
    "Adresse":["Villès Martin"]
  },
  {
    "categorie":"Kayak",
    "Disciplines": "Kayak de mer",
    "Organisateur ou pratique libre": "Ville de Saint-Nazaire (direction des sports)",
    "Usagers a l'annee": 8,
    "Adresse": ["Villès martin"]
  },
  {
    "categorie":"Kayak",
    "Disciplines": "Kayak de mer",
    "Organisateur ou pratique libre": "Pratique libre",
    "Usagers a l'annee": 150,
    "Adresse": ["Cale du port de Gavy à Trébézy","Villes martin","Saint-Marc"]
  },
  {
    "categorie":"Kayak",
    "Disciplines": "Canoe kayak et disciplines associees riviere\n(kayak riviere, kayak-polo, en ligne, slalom, pirogue)",
    "Organisateur ou pratique libre": "Snos Canoe-Kayak",
    "Usagers a l'annee": 134,
    "Adresse":["Bois Joalland","parc des sports"]
  },
  {
    "categorie":"Kayak",
    "Disciplines": "Canoe kayak et disciplines associees riviere\n(kayak riviere, kayak-polo, en ligne, slalom, pirogue)",
    "Organisateur ou pratique libre": "Ville de Saint-Nazaire (direction des sports)",
    "Usagers a l'annee": 290,
    "Adresse":["Bois Joalland"]
  },
  {
    "categorie":"Kayak",
    "Disciplines": "Aviron/Yole",
    "Organisateur ou pratique libre": "Snos Avrion (club et scolaires)",
    "Usagers a l'annee": 1000,
    "Adresse": ["Bois Joalland"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Paddle board/Stand-Up/sauvetage cétier/nage en mer",
    "Organisateur ou pratique libre": "Waterman",
    "Usagers a l'annee": 20,
    "Adresse": ["Courance","Jaunais"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Paddle board/Stand-Up/sauvetage cétier/nage en mer",
    "Organisateur ou pratique libre": "ASCA 44",
    "Usagers a l'annee": 120,
    "Adresse": ["Piscines","Villes Martin","Courance","M. Hulot","jaunais"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Paddle board/Stand-Up/sauvetage cétier/nage en mer",
    "Organisateur ou pratique libre": "SNAN",
    "Usagers a l'annee": 10,
    "Adresse": ["Piscine","Courance"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Paddle board/Stand-Up/sauvetage cétier/nage en mer",
    "Organisateur ou pratique libre": "BEST triathlon",
    "Usagers a l'annee": 170,
    "Adresse":["Villes Martin","Courance","M. Hulot","Jaunais"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Paddle board/Stand-Up/sauvetage cétier/nage en mer",
    "Organisateur ou pratique libre": "Professeurs indépendants",
    "Usagers a l'annee": 50,
    "Adresse":["Villes Martin","Courance","M. Hulot","Jaunais"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Paddle board/Stand-Up/sauvetage cétier/nage en mer",
    "Organisateur ou pratique libre": "Saint-Nazaire Sauvetage cétier",
    "Usagers a l'annee": 10,
    "Adresse": ["Piscines", "Courance"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Paddle board/Stand-Up/sauvetage cétier/nage en mer",
    "Organisateur ou pratique libre": "Ville de Saint-Nazaire (direction des sports)",
    "Usagers a l'annee": 240,
    "Adresse":["Courance", "Bois Joalland"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Paddle board/Stand-Up/sauvetage cétier/nage en mer",
    "Organisateur ou pratique libre": "Pratique libre (baignade en zones surveillées)",
    "Usagers a l'annee": "plusieurs dizaine de milliers",
    "Adresse": ["Villes-Martin"," Porcé","Courance","M. Hulot","Jaunais"]
  },
  {
    "categorie":"Prevention",
    "Disciplines": "Formation au sauvetage en mer/prevention",
    "Organisateur ou pratique libre": "ASCA 44",
    "Usagers a l'annee": 50,
    "Adresse": ["Piscines (formation au BNSSA)"]
  },
  {
    "categorie":"Prevention",
    "Disciplines": "Formation au sauvetage en mer/prevention",
    "Organisateur ou pratique libre": "Lycée maritime",
    "Usagers a l'annee": 100,
    "Adresse":["Port de saint-Nazire"]
  },
  {
    "categorie":"Prevention",
    "Disciplines": "Formation au sauvetage en mer/prevention",
    "Organisateur ou pratique libre": "SNSM station Pornichet",
    "Usagers a l'annee": 100,
    "Adresse": ["SNSM station Pornichet"]
  },
  {
    "categorie":"Prevention",
    "Disciplines": "Formation au sauvetage en mer/prevention",
    "Organisateur ou pratique libre": "Pompiers SDIS",
    "Usagers a l'annee": 30,
    "Adresse": ["Piscines","Cale Port désiré","Port de Saint-Nazaire"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Surf/skim board/body board",
    "Organisateur ou pratique libre": "Professeurs indépendants",
    "Usagers a l'annee": 50,
    "Adresse": ["Courance","M. Hulot","Grand trait"]
    
  },
  {
    "categorie":"Surf",
    "Disciplines": "Surf/skim board/body board",
    "Organisateur ou pratique libre": "Atlantic Surf Academy",
    "Usagers a l'annee": 50,
    "Adresse": ["Courance"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Surf/skim board/body board",
    "Organisateur ou pratique libre": "L.A Skim",
    "Usagers a l'annee": 20,
    "Adresse": ["Courance"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Surf/skim board/body board",
    "Organisateur ou pratique libre": "Ride Atao",
    "Usagers a l'annee": 7,
    "Adresse": ["Courance"]
  },
  {
    "categorie":"Surf",
    "Disciplines": "Surf/skim board/body board",
    "Organisateur ou pratique libre": "Pratique libre",
    "Usagers a l'annee": 500,
    "Adresse":["Courance","M. Hulot","Grand trait"]
  },
  {
    "categorie":"Plonge",
    "Disciplines": "Plongee sous-marine/chasse sous marine",
    "Organisateur ou pratique libre": "Saint-Nazaire subaquatique",
    "Usagers a l'annee": 38,
    "Adresse": ["Piscine"]
  },
  {
    "categorie":"Plonge",
    "Disciplines": "Plongee sous-marine/chasse sous marine",
    "Organisateur ou pratique libre": "Subaquavia",
    "Usagers a l'annee": 20,
    "Adresse": ["Piscine"]
  },
  {
    "categorie":"Plonge",
    "Disciplines": "Plongee sous-marine/chasse sous marine",
    "Organisateur ou pratique libre": "Groupe Atlantic Plongée",
    "Usagers a l'annee": 82,
    "Adresse":["Piscine"]
  },
  {
    "categorie":"Plonge",
    "Disciplines": "Plongee sous-marine/chasse sous marine",
    "Organisateur ou pratique libre": "Pompiers",
    "Usagers a l'annee": 20,
    "Adresse":["Piscine"]
  },
  {
    "categorie":"Plonge",
    "Disciplines": "Plongee sous-marine/chasse sous marine",
    "Organisateur ou pratique libre": "Pratique libre",
    "Usagers a l'annee": 40,
    "Adresse": ["Jaunais","Courance"]
  },
 
];
    
});

