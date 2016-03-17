"use strict";

$(document).ready(function() {
    
    var firstTime4 = true;
    
    // Fullpage
    $('#container').fullpage({
        anchors: ['1', '2', '3', '4', '5', '6', '7', '8'],
        navigation: true,
        navigationPosition: 'right',
        css3: true,
        scrollBar: true,
        verticalCentered: false,
        
        afterLoad: function(anchorLink, index){
            var loadedSection = $(this);

            if (firstTime4) {
                if (index == 4) {
                    
                }
            }
        }
    });
    
    /*Calcule la nouvelle position de la div*/
    function makeNewPosition(element){

        // Get viewport dimensions (remove the dimension of the div)
        var h = 10;
        var w = 10;

        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);

        return [nh,nw];    
    }
    
    // animer les images de la page d'accueil
    function animateDiv(element){
        var newq = makeNewPosition();

        $(element).animate({ top: newq[0], left: newq[1] }, 1000, function(){
          animateDiv(element);        
        });

    };
    
    $('.floating').each(function(){
        animateDiv($(this));
    });


});