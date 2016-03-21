module.exports = exports = function() {
    $('.tip').tooltipsy({
        offset: [-10, 0],
        show: function (e, $el) {
            $el.css({
                'left': parseInt($el[0].style.left.replace(/[a-z]/g, '')) - 50 + 'px',
                'opacity': '0.0',
                'display': 'block'
            }).animate({
                'left': parseInt($el[0].style.left.replace(/[a-z]/g, '')) + 50 + 'px',
                'opacity': '1.0'
            }, 300);
        },
        hide: function (e, $el) {
            $el.slideUp(100);
        },
        css: {
            'padding': '10px',
            'max-width': '200px',
            'color': '#2b4c7e',
            'background-color': 'rgba(255, 255, 255, 0.95)',
            'border': '1px solid #2b4c7e',
            'border-radius': '10px',
            'text-align': 'justify'
        }
    });
};