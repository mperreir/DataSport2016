"use strict";

$(document).ready( function () {
    animTitle();
})
                  
function animTitle() {
    $(avion)
		.transition({
					opacity: 1,
					left: '110%',
					delay: 500 }, 12000, 'linear');
	$(cycliste)
		.transition({
					opacity: 1,
					left: '110%',
					delay: 500 }, 9900, 'linear');
	$(nageur)
		.transition({
					opacity: 1,
					left: '110%',
					delay: 500 }, 10000, 'linear');
}