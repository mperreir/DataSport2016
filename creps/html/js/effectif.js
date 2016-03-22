$(function() {
    var //margin = {top: 40, right: 20, bottom: 30, left: 40},
        //width = 1500 - margin.left - margin.right,
        //height = 520 - margin.top - margin.bottom,
        unitelargeur=12,
        unitehauteur=4,
        absinit=60,
        ordinit=250;
    
    var absh=absinit;
    var ordh=ordinit;
    
    // Fonction d'initialisation
    console.log("Coucou");
    // Parcours des données 
    
    var titrehistogramme = d3.select("#histogrammeeffectif").append("text") 
        .text("La Région compte aujourd'hui 1 026 000 licenciés")
        .attr("x",10)
        .attr("y",30)
        .attr("font-size",25)
        .attr("fill","black");
        
    var linehaute = d3.select("#histogrammeeffectif").append("line")
                .attr("x1",20)
                .attr("y1",40)
                .attr("x2","100%")
                .attr("y2",40)
                .attr("stroke","#00D68C")
                .attr("stroke-width",0.7);
                
    var titrehistogramme1 = d3.select("#histogrammeeffectif").append("text") 
        .text("Parmis eux")
        .attr("x",10)
        .attr("y",65)
        .attr("font-size",17)
        .attr("fill","black"); 
     
    var titrehistogramme2 = d3.select("#histogrammeeffectif").append("text") 
        .text("277")
        .attr("x",10)
        .attr("y",95)
        .attr("font-size",27)
        .attr("fill","#00D68C"); 
    
    var titrehistogramme3 = d3.select("#histogrammeeffectif").append("text") 
        .text("Sportifs de Haut Niveau sur")
        .attr("x",60)
        .attr("y",95)
        .attr("font-size",22)
        .attr("fill","#black"); 
        
    var titrehistogramme4 = d3.select("#histogrammeeffectif").append("text") 
        .text("40")
        .attr("x",335)
        .attr("y",95)
        .attr("font-size",22)
        .attr("fill","#00D68C"); 

    var titrehistogramme5 = d3.select("#histogrammeeffectif").append("text") 
        .text("108")
        .attr("x",635)
        .attr("y",145)
        .attr("font-size",22)
        .attr("fill","black");
    
    var image = d3.select("#histogrammeeffectif").append("img")
            .attr("src","../img/data.png")
            .attr("x",500)
            .attr("y",140)
            .attr("width","1/8vw")
            .attr("height","1/3vh");
            
    var titrehistogramme6 = d3.select("#histogrammeeffectif").append("text") 
        .text("Femmes")
        .attr("x",685)
        .attr("y",145)
        .attr("font-size",22)
        .attr("fill","#008080");
        
    var linehaute = d3.select("#histogrammeeffectif").append("line")
                .attr("x1",635)
                .attr("y1",157)
                .attr("x2",778)
                .attr("y2",157)
                .attr("stroke","#008080")
                .attr("stroke-width",0.7);
    
    var titrehistogramme7 = d3.select("#histogrammeeffectif").append("text") 
        .text("169")
        .attr("x",635)
        .attr("y",185)
        .attr("font-size",22)
        .attr("fill","black");
        
    var titrehistogramme8 = d3.select("#histogrammeeffectif").append("text") 
        .text("Hommes")
        .attr("x",685)
        .attr("y",185)
        .attr("font-size",22)
        .attr("fill","#00D68C");
        
    
        
    $.getJSON("data/effectif.json", function(donnees) {
        $.each(donnees,function(key, value){
            var hauteurhomme=value.masculin*unitehauteur;
            var rect = d3.select("#histogrammeeffectif").append("rect") // Tracer le rectangle correspondant à l'effectif d'un sport
                .attr("x",absh)
                .attr("y",ordh-hauteurhomme)
                .attr("width",unitelargeur)
                .attr("height",hauteurhomme)
                .attr("fill","#00D68C");
            var hauteurfemme=value.feminin*unitehauteur;    
            var rect = d3.select("#histogrammeeffectif").append("rect") // Tracer le rectangle correspondant à l'effectif d'un sport
                .attr("x",absh)
                .attr("y",ordh-hauteurhomme-hauteurfemme)
                .attr("width",unitelargeur)
                .attr("height",hauteurfemme)
                .attr("fill","#008080");
            var abstext=absh+30;
            var abstext1=absh+40;
            var ordtext=ordh+30;
            
            var texte = d3.select("#histogrammeeffectif").append("text")
                .text(key)
                .style("text-anchor","end")
                .attr("transform", "rotate(-65 "+abstext+" "+ ordtext+") translate("+abstext1+" "+ordh+")");
                
            console.log("Coucou");
            absh=absh+20; // Espace entre 2 barre
        });
        
        
    });
    
    
    
    var rect = d3.select("#svgdepodiumhomme").append("rect")
        .attr("x",100)
        .attr("y",170)
        .attr("width",240)
        .attr("height",40)
        .attr("fill","white");
        

    
        
    
    
    var rect = d3.select("#svgdepodiumhomme").append("rect")
        .attr("x",100)
        .attr("y",145)
        .attr("width",80)
        .attr("height",40)
        .attr("fill","white");
    
    var rect = d3.select("#svgdepodiumhomme").append("rect")
        .attr("x",180)
        .attr("y",120)
        .attr("width",80)
        .attr("height",80)
        .attr("fill","white");
        
    var rect = d3.select("#svgdepodiumhomme").append("rect")
        .attr("x",500)
        .attr("y",120)
        .attr("width",240)
        .attr("height",40)
        .attr("fill","white");
        
    var rect = d3.select("#svgdepodiumfemme").append("rect")
        .attr("x",100)
        .attr("y",170)
        .attr("width",240)
        .attr("height",40)
        .attr("fill","white");
        
    /*var rect = d3.select("#svgdepodiumfemme").append("rect")
        .attr("x",100)
        .attr("y",145)
        .attr("width",80)
        .attr("height",40)
        .attr("fill","white");*/
    
    var rect = d3.select("#svgdepodiumfemme").append("rect")
        .attr("x",180)
        .attr("y",120)
        .attr("width",80)
        .attr("height",80)
        .attr("fill","white");
        
    /*var rect = d3.select("#svgdepodiumfemme").append("rect")
        .attr("x",500)
        .attr("y",100)
        .attr("width",240)
        .attr("height",80)
        .attr("fill","white");*/
        
    var rect = d3.select("#svgdepodiumhomme").append("rect")
        .attr("x",65)
        .attr("y",20)
        .attr("width",300)
        .attr("height",20)
        .attr("fill","white");
        
        
    var text = d3.select("#svgdepodiumhomme").append("text")
        .text("Voile")
        .attr("x",120)
        .attr("y",165)
        .attr("font-size",14)
        .attr("fill","black");
    
    var text = d3.select("#svgdepodiumhomme").append("text")
        .text("21")
        .attr("x",130)
        .attr("y",185)
        .attr("font-size",14)
        .attr("fill","black");
        
    var text = d3.select("#svgdepodiumhomme").append("text")
        .text("Equitation")
        .attr("x",187)
        .attr("y",140)
        .attr("font-size",14)
        .attr("fill","black");
    
    var text = d3.select("#svgdepodiumhomme").append("text")
        .text("22")
        .attr("x",210)
        .attr("y",160)
        .attr("font-size",14)
        .attr("fill","black");
        
    var text = d3.select("#svgdepodiumhomme").append("text")
        .text("Roller")
        .attr("x",282)
        .attr("y",185)
        .attr("font-size",14)
        .attr("fill","black");
    
    var text = d3.select("#svgdepodiumhomme").append("text")
        .text("9")
        .attr("x",297)
        .attr("y",205)
        .attr("font-size",14)
        .attr("fill","black");
        
    var text = d3.select("#svgdepodiumfemme").append("text")
        .text("Equitation")
        .attr("x",187)
        .attr("y",140)
        .attr("font-size",14)
        .attr("fill","black");
    
    var text = d3.select("#svgdepodiumfemme").append("text")
        .text("22")
        .attr("x",210)
        .attr("y",160)
        .attr("font-size",14)
        .attr("fill","black");
        
    var text = d3.select("#svgdepodiumfemme").append("text")
        .text("Volley")
        .attr("x",282)
        .attr("y",185)
        .attr("font-size",14)
        .attr("fill","black");
    
    var text = d3.select("#svgdepodiumfemme").append("text")
        .text("9")
        .attr("x",297)
        .attr("y",205)
        .attr("font-size",14)
        .attr("fill","black");
        
    var text = d3.select("#svgdepodiumfemme").append("text")
        .text("Aviron")
        .attr("x",120)
        .attr("y",185)
        .attr("font-size",14)
        .attr("fill","black");
    
    var text = d3.select("#svgdepodiumfemme").append("text")
        .text("9")
        .attr("x",130)
        .attr("y",205)
        .attr("font-size",14)
        .attr("fill","black");
        
    var titrehistogramme8 = d3.select("#svgdepodiumhomme").append("text") 
        
        .text("Sports les plus représentés chez les hommes")
        .attr("x",70)
        .attr("y",34)
        .attr("font-size",14)
        .attr("fill","#008080");
        
    var rect = d3.select("#svgdepodiumfemme").append("rect")
        .attr("x",65)
        .attr("y",20)
        .attr("width",300)
        .attr("height",20)
        .attr("fill","white");
        
    var titrehistogramme8 = d3.select("#svgdepodiumfemme").append("text") 
        .text("Sports les plus représentés chez les femmes")
        .attr("x",70)
        .attr("y",34)
        .attr("font-size",14)
        .attr("fill","black");
        
    var camembert = d3.select("svgderepartion")
    
    
});

