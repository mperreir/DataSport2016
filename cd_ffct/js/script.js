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

    $(window).scroll(function() {
        if ($(window).scrollTop() == 0) {
            $('.home').fadeOut();
        } else {
            $('.home').fadeIn();
        }
    });
    
});