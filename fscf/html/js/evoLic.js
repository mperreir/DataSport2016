$(function () {
    $(document).ready(function() {
            var options = {
                chart: {
                    renderTo: 'evolutionLicencies',
                    style: {
                    fontFamily:  "'Roboto Condensed', sans-serif"
                    },
                    type: 'column',
                    backgroundColor: '#EEE7D8',
                    width: 800,
                    height: 400
        },
        title: {
            text: ""
        },
        xAxis: {
            categories: [],
            crosshair: false,
            gridLineColor: '#5D5D5D',
            labels: {
               style: {
                  color: '#5D5D5D',
                  fontFamily:  "'Roboto Condensed', sans-serif"
               }
            },
            lineColor: '#5D5D5D',
            tickColor: '#707073',
            tickWidth: 0,
        },
        yAxis: {
            title: {
                text: 'Evolution du Nombre de licenciés durant 2011-2015 (en %)',
                style:{color: '#5D5D5D',
                   fontFamily:  "'Roboto Condensed', sans-serif",
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                },
                style: {
                  color: '#5D5D5D',
                  fontFamily:  "'Roboto Condensed', sans-serif",
               }
            },
            gridLineColor: '#5D5D5D',
            gridLineDashStyle: 'dot',
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 0,
        },
        credits: {
            enabled: false
        },
         legend: {
            enabled: false
        },
        exporting: {
          enabled: false,  
        },
      tooltip: {
            shared: false,
            valueSuffix: ' %',
            backgroundColor: '#5D5D5D',
            style: {
               color: '#F0F0F0',
               fontFamily:  "'Roboto Condensed', sans-serif"
            }
         },
        plotOptions: {
            series: {
               borderWidth: 0,
               animation: {
                    duration: 3000
                },
                color : "#345468"
            }
        },
        
        series: []
    }
    
    $.getJSON("js/Evolution.json", function(json) {
    options.xAxis.categories = json[0]['data'];
    options.series[0] = json[1];
    chart = new Highcharts.Chart(options);
    });
});
});