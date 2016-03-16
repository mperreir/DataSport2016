$(function() {
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 1500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        absinit=60,
        listexhomme = [],
        effpartrancheh=[],
        effpartranchef=[],
        ordh=400,
        ordf=400,
        ordinit=400;
        
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    
    var data1;
    var sport;
    var i;
    var eff;
    var cote = 15;
    
    for (a=0;a<9;a++){
            listexhomme.push(absinit);
            effpartrancheh.push(0);
            effpartranchef.push(0);
    }
    
    console.log(Math.floor(666/13));
    
    
    $.getJSON("data/pyramide.json", function(donnees) {
        $.each(donnees,function(key, value){
            for (i=0;i<9;i++) {
                effpartrancheh[i]=effpartrancheh[i]+value.masculin[i];
                effpartranchef[i]=effpartranchef[i]+value.feminin[i];
            }
        });
        console.log(effpartranchef);
        for (i=0;i<9;i++) {
        var absh=absinit;
            if (effpartrancheh[i]%2==0) {
                for (eff=0;eff<(effpartrancheh[i]/2);eff++) {
                    console.log("div par 2");
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#933c8e");
                    absh=absh+cote+5;
                }
                listexhomme[i]=absh;
                ordh=ordh-cote-5;
                absh=absinit;
                for (eff=(effpartrancheh[i]/2);eff<effpartrancheh[i];eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#933c8e");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            } else {
                for (eff=0;eff<(Math.floor(effpartrancheh[i]/2)+1);eff++) {
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#933c8e");
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
                        .attr("fill","#933c8e");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            }
        }
        ordh=ordinit;
        for (i=0;i<9;i++) {
            if (listexhomme[i]!=absinit){
                var line = d3.select("svg").append("line")
                .attr("x1",listexhomme[i]+15)
                .attr("y1",ordh)
                .attr("x2",listexhomme[i]+15)
                .attr("y2",ordh-35)
                .attr("stroke","#9dcc41")
                .attr("stroke-width",0.7);
            ordh=ordh-40;
            listexhomme[i]=listexhomme[i]+15;
            } else {
                ordh=ordh-25;
            }
        }
        ordh=ordinit;
        for (i=0;i<9;i++) {
            var absh=listexhomme[i];
            if (effpartranchef[i]%2==0) {
                for (eff=0;eff<(effpartranchef[i]/2);eff++) {
                    console.log("Coucou");
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#9dcc41");
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
                        .attr("fill","#9dcc41");
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
                        .attr("fill","#9dcc41");
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
                        .attr("fill","#9dcc41");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
            }
        }
    });

    /*function dessiner(sport){
        
            //rdh=ordinit;
            //ordf=ordinit;
    }*/
    
    console.log("dvdf");
    
    
    
                
    
        
    /*$.getJSON("data/pyramide.json", function(donnees) {
        $.each(donnees,function(key, value){
            for (i=0;i<9;i++) {
                var absh;
                absh=listexhomme[i];
                for (eff=0;eff<value.masculin[i];eff++) {
                    console.log(value.masculin[i]);
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordh)
                        .attr("width",cote)
                        .attr("height",cote)
                        .attr("fill","#933c8e");
                    absh=absh+cote+5;
                }
                ordh=ordh-cote-5;
                listexhomme[i]=absh;

            }
            ordh=ordinit;
            ordf=ordinit;
        });
        for (i=0;i<11;i++) {
            var line = d3.select("svg").append("line")
                .attr("x1",listexhomme[i]+10)
                .attr("y1",ordh)
                .attr("x2",listexhomme[i]+10)
                .attr("y2",ordh+5)
                .attr("stroke","#9dcc41")
                .attr("stroke-width",0.7);
            ordh=ordh-10;
            listexhomme[i]=listexhomme[i]+5;
        }
        $.each(donnees,function(key, value){
            for (i=0;i<9;i++) {
                var absh;
                absh=listexhomme[i];
                for (eff=0;eff<value.feminin[i];eff++) {
                    console.log(value.feminin[i]);
                    var rect = d3.select("svg").append("rect")
                        .attr("x",absh+10)
                        .attr("y",ordf)
                        .attr("width",5)
                        .attr("height",5)
                        .attr("fill","#9dcc41");
                    absh=absh+10;
                }
                ordf=ordf-10;
                listexhomme[i]=absh;
            }
            ordh=ordinit;
            ordf=ordinit;
        });
    });*/
    
    var femme = d3.select("svg").append("path")
        .attr("fill","#7C7C7C")
        .attr("d","M22.1,29L0.2,99.3c-0.2,0.7,0.4,1.4,1.3,1.4h11.1c0.4,0,0.7-0.1,0.9-0.3c1.9-1.6,10.7-8.4,20.2-0.1   c0.2,0.2,0.6,0.3,0.9,0.3h10.9c0.9,0,1.5-0.7,1.3-1.4L24.7,29L22.1,29z");
        
    var t1 = d3.select("svg").append("text")
        .text("10 - 14")
        .attr("x",0)
        .attr("y",410)
        .attr("font-size",16)
        .attr("fill","red");
        
    var t2 = d3.select("svg").append("text")
        .text("15 - 19")
        .attr("x",0)
        .attr("y",410)
        .attr("font-size",16)
        .attr("fill","red");
    
});


