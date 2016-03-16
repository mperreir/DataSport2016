$(function() {
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        //abs=400,
        absinit=40,
        listexhomme = [],
        listexfemme = [],
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
    
    for (a=0;a<11;a++){
            listexhomme.push(absinit);
            listexfemme.push(absinit);
            console.log(listexhomme);
    }
    
        
    $.getJSON("data/pyramide.json", function(donnees) {
        $.each(donnees,function(key, value){
            for (i=0;i<11;i++) {
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
        /*for (i=0;i<11;i++) {
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
            for (i=0;i<11;i++) {
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
        });*/
    });
    
    var femme = d3.select("svg").append("path")
        .attr("fill","#7C7C7C")
        .attr("d","M22.1,29L0.2,99.3c-0.2,0.7,0.4,1.4,1.3,1.4h11.1c0.4,0,0.7-0.1,0.9-0.3c1.9-1.6,10.7-8.4,20.2-0.1c0.2,0.2,0.6,0.3,0.9,0.3h10.9c0.9,0,1.5-0.7,1.3-1.4L24.7,29L22.1,29z");
        
    var t1 = d3.select("svg").append("text")
        .text("Coucou")
        .attr("x",200)
        .attr("y",200)
        .attr("fill","red");
});


