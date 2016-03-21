(function($) {
    var NB_INCLUDES;
    var LOADED_INCLUDES = 0;

    $.fn.inc = function(callback, url) {
        return this.length && url ? this.each(function() {
            var t = $(this);
            $.ajax({
                url: url,
                success: function(txt, jqXHR, textStatus) {
                    LOADED_INCLUDES++;
                    t.html(txt);

                    if (LOADED_INCLUDES === NB_INCLUDES) {
                        callback();
                    }
                }
            });
        }) : this;
    };
    
    $.fn.autoInc = function(callback) {
        NB_INCLUDES = $('[class*="inc:"]').length;
        $('[class*="inc:"]').each(function() {
            var match = /inc:(\S+)/.exec(this.className || '');
            match && $(this).inc(callback, unescape(match[1]));
        });
    };

})(jQuery);