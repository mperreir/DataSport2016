$(function () {
    $(document).ready(function() {
            var options = {
                chart: {
                    renderTo: 'interactif15Pratiques',
                    style: {
                    fontFamily:  "'Roboto Condensed', sans-serif"
                    },
                    type: 'line',
                    backgroundColor: '#EEE7D8',
                    width: 750,
                    height: 350
            },
        title: {
            text: ""
        },
        xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            endOnTick:false,
            startOnTick:false,
            title: {
                formatter: function () {
                    return this.value;
                },
               style: {
                  fontFamily:  "'Roboto Condensed', sans-serif"
               },
            },
            lineColor: 'tranparent',
            tickLength: 0,
            tickWidth: 0,
        },
        yAxis: {
            title: {
                text: 'Nombre de licencié',
                style:{color: '#5D5D5D',
                   fontFamily:  "'Roboto Condensed', sans-serif"
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            lineColor: 'transparent',
            gridLineColor: '#5D5D5D',
            gridLineDashStyle: 'dot',
            tickWidth: 0,
        },
        tooltip: {
            shared: false,
        },
        credits: {
            enabled: false
        },
        exporting: {
         enabled: false
         },
        plotOptions: {
                series: {
                animation: {
                    duration: 3000
                },
                marker: {
                    enabled: false,
                },
             }
        },
        legend: {
            symbolHeight: 0,
            symbolWidth: 0,
            symbolRadius: 0,
            
            itemStyle: {
               color: '#606063'
            },
            itemHoverStyle: {
               color: '#606063'
            },
            itemHiddenStyle: {
               color: '#bebebe'
            },
            
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 20,
            y: 50,
         },
        series: [],
    };
    
    
    
    $.getJSON("js/Analyse15.json", function(json) {
    options.xAxis.categories = json[0]['data'];
    for(var i=1;i<json.length;i++){
        options.series[i-1] = json[i];
        if(json[i]['data'][0] < json[i]['data'][1]){
            options.series[i-1].color = "#345468";
        }
        else{
            options.series[i-1].color = "#f15a25";
        }
        
        if(i == 2 || i == 15 || i == 10 || i == 11 || i == 12){
            options.series[i-1].visible = true;
        }
        else{
            options.series[i-1].visible = false;
        }
        options.series[i-1].dataLabels = true;
    }
    chart = new Highcharts.Chart(options);
    });
    

    $('#button1').click(function() {  
        var chart = $('#interactif15Pratiques').highcharts();
        var series = chart.series;
        for(var i = 0; i < series.length; i++){
        if(!series[i].visible) {
            series[i].show();
        }
        }
    });
    
});
});