var matrix = [
    [
        {full:1,moveDirection:'xy',first:true},{full:1,moveDirection:'yx'},{full:0}
    ],
    [
        {full:0},{full:1},{full:1, moveDirection:'xy'}
    ]
];

$(document).ready(function() {
    $('.slidingSpaces').ferroSlider({
        //axis                    : 'xy',
        displace                : matrix,
        createMap               : true,
        mapPosition             : '85%_center',
        createSensibleAreas     : true
    });
}); 

window.onload = function () {
    var ele = document.getElementById("outerSliderWrapper");
    ele.addEventListener("wheel", scrollEvent);
    
};
//console.log($.fn.ferroSlider.getActualSlideId() +"!!!!");
function scrollEvent(e){
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    //console.log(delta +"!!!!");
    //var currentId = $.fn.ferroSlider.getActualSlideId();
   if(delta == -1){
       $.fn.ferroSlider.slideToNext();
   }
    else{
        $.fn.ferroSlider.slideToPrev();
    }
}