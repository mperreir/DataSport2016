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
        d3.select("#sect2").selectAll("image").attr("x","0");
        $("#pa").countTo({
            speed: 2500,
            refreshInterval: 50
        });
        
        $('.t1').countTo({
            from: 0,
            to: 9740,
            speed: 2000,
            refreshInterval: 50
        });
        $('#r1').animate({
            width: 240.7
        },2000);
        $('#i1').animate({
            x: 240.7
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
        $('#i2').animate({
            x: 126.4
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
        $('#i3').animate({
            x: 101.2
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
        $('#i4').animate({
            x: 21.7
        },500);
    }
            if(al == "3rdPage"){
                d3.select("#barchart").selectAll("svg").each(function(){
                    d3.select(this).selectAll(".bar").each(function(){
                        console.log(this);
                        $(this).animate({
                    height: $(this).attr("height")
                },2000);
                    })
                });
            }
        };