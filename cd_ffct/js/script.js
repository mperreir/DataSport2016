"use strict";

$(document).ready(function() {
    $('#container').fullpage({
        anchors: ['1', '2', '3', '4', '5', '6', '7', '8'],
        navigation: true,
        navigationPosition: 'right',
        css3:true,
        scrollBar:true
    });
    
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