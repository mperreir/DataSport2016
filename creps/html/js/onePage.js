//Changer la taille des sections à la taille de la fenêtre
$('section').height($(window).height());

//Change la classe de la section active
$('section').first().addClass('active');

//Action à l'événement mousewheel (DOMMouseScroll pour la compatibilité avec Firefox)
$(document).on('mousewheel DOMMouseScroll', function (e) {
    //Empêche le scrolling par défaut
    e.preventDefault();
    var active = $('section.active');
    //Détermine le sens du scroll
    var delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
    
    //Scroll vers le bas
    if (delta < 0) {
        var next = active.next();
        //On vérifie s'il y a encore des sections
        if (next.length) {
            //Animation
           var timer = setTimeout(function () {
                $('body, html').animate({
                    scrollTop: next.offset().top
                }, 'slow');
                
                //On change la section active
                next.addClass('active')
                    .siblings().removeClass('active');
                
                clearTimeout(timer);
            }, 20);
        }
    //Scroll vers le haut
    }
    else {
        var prev = active.prev();
        if (prev.length) {
            var timer = setTimeout(function () {
                $('body, html').animate({
                    scrollTop: prev.offset().top
                }, 'slow');

                prev.addClass('active')
                    .siblings().removeClass('active');
                
                clearTimeout(timer);
            }, 60);
        }
    }
});