$(document).ready(function() {
      $('#fullPage').fullpage({
        sectionsColor: [ '#414141','#414141', '#414141', '#414141', '#414141','#414141','#414141','#414141'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage', '6thPage', '7thPage', '8thPage'],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        navigation: true,
        navigationPosition: 'right',
        css3:true,
        loopHorizontal: false,
        afterLoad: countNumber,
        resize:true
      });
    });
        countNumber = function(al,index){
    if(al == "secondPage"){
        $("#pa").countTo({
            speed: 2500,
            refreshInterval: 50
        })
        $('.t1').countTo({
            from: 0,
            to: 9740,
            speed: 2000,
            refreshInterval: 50
        });
        $('#r1').animate({
            width: 240.7
        },2000);
        $('.t2').countTo({
            from: 0,
            to: 5113,
            speed: 1500,
            refreshInterval: 50
        });
        $('#r2').animate({
            width: 126.4
        },1500);
        
        $('.t3').countTo({
            from: 0,
            to: 4095,
            speed: 1000,
            refreshInterval: 50
        });
        $('#r3').animate({
            width: 101.2
        },1000);
        
        $('.t4').countTo({
            from: 0,
            to: 878,
            speed: 500,
            refreshInterval: 100
        });
        $('#r4').animate({
            width: 21.7
        },500);
    }
        };