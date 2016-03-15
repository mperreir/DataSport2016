$("#container2").height($("#container1").height());
var selected = false;
        var svg = d3.select("#svg").attr("preserveAspectRatio","none").on("mouseover",svgInHandler).on("mouseout",svgOutHandler);
        svg1 = svg.selectAll("polygon").call(d3.behavior.zoom().scaleExtent([1, 2]).on("zoom", zoom)).on("click",clickHandler);
        var i = 1;
        svg2 = svg.selectAll("circle").call(d3.behavior.zoom().scaleExtent([1, 2]).on("zoom", zoom)).on("mouseover",mouseOverHandler).on("mouseout",mouseOutHandler).on("click",clickHandler);
        function zoom() {
            console.log("translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            svg1.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            svg2.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }; 
        
        function mouseOverHandler(e){
            //var loc = cursorPoint(e);
            //console.log(loc);
            if(selected){
                return;
            }
            else{
                $("#infos").stop();
                $("#infos").css("opacity",0);
                $("#infos").css("visibility","visible");
                var fill = $(this).parent().attr("fill");
                $("#infos").css("background", fill);
                $("#infos").animate({opacity: 1},1000);
            }
            
            //afficher les donnees....
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
                   console.log(currentCircle);
                   $(currentCircle).attr("r",7.8);
               }
               //changing infos
               $("#infos").stop();
               $("#infos").css("opacity",0);               
               $("#infos").css("visibility","hidden");
               $("#infos").css("visibility","visible");
               $("#infos").css("background", fill);
               $("#infos").animate({opacity: 1},1000);
               
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


function svgInHandler(){
    $.fn.fullpage.setAllowScrolling(false);
};

function svgOutHandler(){
    $.fn.fullpage.setAllowScrolling(true);
}

