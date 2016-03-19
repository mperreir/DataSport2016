$(document).ready(function($) {
    $.fn.countTo = function(options) {
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;
            

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
    };
});

var scroll = false;
$(window).scroll(function(){
    if(scroll == false){
        if($(window).scrollTop() > 950) {
            jQuery(function($) {
                $('#timer').countTo({
                    from: 0,
                    to: 5,
                    speed: 1700,
                    refreshInterval: 10,
                });
            });
            scroll = true;
        }
    }
});

var scroll2 = false;
$(window).scroll(function(){
    if(scroll2 == false){
        if($(window).scrollTop() > 1100) {
            jQuery(function($) {
                $('#timer2').countTo({
                    from: 0,
                    to: 43,
                    speed: 1300,
                    refreshInterval: 10,
                });
            });
            scroll2 = true;
        }
    }
});

var scroll3 = false;
$(window).scroll(function(){
    if(scroll3 == false){
        if($(window).scrollTop() > 1300) {
            jQuery(function($) {
                $('#timer3').countTo({
                    from: 0,
                    to: 52,
                    speed: 1300,
                    refreshInterval: 10,
                });
            });
            scroll3 = true;
        }
    }
});


$(function(){
  $('#btn_up').click(function() {
    $('html,body').animate({scrollTop: 0}, 'slow');
  });
});