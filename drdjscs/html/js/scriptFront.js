
var size = $( window ).width();
var sizeAdapt = size-450;
$(document ).ready(function() {
  $(".mainContent").css("width", sizeAdapt);
  $(".nv-axis").hide();
});

$( window ).resize(function() {

var size = $( window ).width();
var sizeAdapt = size-450;
 $(".mainContent").css("width", sizeAdapt);
})


