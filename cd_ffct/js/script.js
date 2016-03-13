"use strict";

$(document).ready(function() {
    // Fullpage
    $('#container').fullpage({
        anchors: ['1', '2', '3', '4', '5', '6', '7', '8'],
        navigation: true,
        navigationPosition: 'right',
        css3: true,
        scrollBar: true,
        verticalCentered: false
    });
    
    // Bouton home
    /*
    $('.home').click(function() {
        $('html,body').animate({scrollTop: 0}, 'slow');
    });
    
    $(window).scroll(function() {
        if ($(window).scrollTop() == 0) {
            $('.home').fadeOut();
        } else {
            $('.home').fadeIn();
        }
    });
    */
});