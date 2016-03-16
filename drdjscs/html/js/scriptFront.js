$(document).ready(function() {
var size = $(window).width();
var sizeAdapt = size-450;
var sizeAide = size-580;

$(".etat").click(function() {
	if($(".etat").hasClass("selected")){
			$(".aide2,.aide3,.aide4").show();
			$(".etat").removeClass("selected");
		}else{
			$(".etat").addClass("selected");
			$(".aide2,.aide3,.aide4").hide();
		}

 });
$(".cnds").click(function() {
	if($(".cnds").hasClass("selected")){
			$(".aide12,.aide13,.aide7,.aide5").show();
			$(".cnds").removeClass("selected");
		}else{
			$(".cnds").addClass("selected");
			$(".aide12,.aide13,.aide7,.aide5").hide();
		}
	

 });
$(".autres").click(function() {
	if($(".autres").hasClass("selected")){
			$(".aide6,.aide10,.aide11").show();
			$(".autres").removeClass("selected");
		}else{
			$(".autres").addClass("selected");
			$(".aide6,.aide10,.aide11").hide();
		}
	

 });




$(".Less").click(function() {
	$(".aide h3").hide();

 });

$(".More").click(function() {
	$(".aide h3").show();

 });
$(function(){

   var $testi= $(".btnTimeline");
    $('.Less').click(function() {
    	
        $testi.animate({ 'padding': '10px 20px 10px 20px' }, 500);

    }, function() {
        $testi.animate({ 'padding': '5px 20px 5px 20px' }, 500);
    });     
    $('.More').click(function() {
    	
        $testi.animate({ 'padding': '5px 20px 5px 20px' }, 500);
    }, function() {
        $testi.animate({ 'padding': '10px 20px 10px 20px' }, 500);
    });   
});




$(document).ready(function() {
  $(".mainContent").css("width", sizeAdapt);
  $(".aideTimeline").css("width", sizeAide);
  $(".nv-axis").hide();
});

$( window ).resize(function() {

var size = $( window ).width();
var sizeAdapt = size-450;
 $(".mainContent").css("width", sizeAdapt);
  $(".aideTimeline").css("width", sizeAide);

})

});

