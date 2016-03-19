(function (H) {
    function deferRender (proceed) {
        var series = this, 
            $renderTo = $(this.chart.container.parentNode);

        // It is appeared, render it
        if ($renderTo.is(':appeared') || !series.options.animation) {
            proceed.call(series);
            
        // It is not appeared, halt renering until appear
        } else  {
            $renderTo.appear(); // Initialize appear plugin
            $renderTo.on('appear', function () {
                proceed.call(series);
            });
        }
    };
    
    H.wrap(H.Series.prototype, 'render', deferRender);
    
}(Highcharts));

$(function () {
     $(document).ready(function() {
            var options = {
                 chart: {
                    renderTo: 'comparaisonHF',
                    style: {
                    fontFamily:  "'Roboto Condensed', sans-serif"
                    },
                    type: 'bar',
                    backgroundColor: '#EEE7D8',
                    width: 850,
                    height: 350
                },
            title: {
                text: "",
            },
            xAxis: {
                categories: [],
                reversed: false,
                labels: {
                    step: 1,
                    style: {
                fontFamily:  "'Roboto Condensed', sans-serif"
                },
                },
                 lineColor: 'transparent',
                 tickWidth: 0,
            },
            yAxis: {
                title: {
                    text: 'Nombre de licenciés',
                    style:{color: '#5D5D5D',
                        fontFamily:  "'Roboto Condensed', sans-serif"
                    }
                },
                max: 24000,
                labels: {
                    formatter: function () {
                        return Math.abs(this.value);
                    },
                    style: {fontFamily:  "'Roboto Condensed', sans-serif"},
                },
                gridLineColor: '#5D5D5D',
                gridLineDashStyle: 'dot',
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
               tickWidth: 0,
            },

            plotOptions: {
                series: {
                    stacking: 'normal',
                    borderWidth: 0,
                    animation: {
                    duration: 3000
                    }
                }
        },

            tooltip: {
                style: {fontFamily:  "'Roboto Condensed', sans-serif"},
                formatter: function () {
                    return '<b>' + this.series.name + ', année ' + this.point.category + '</b><br/>' +
                        'Licenciés: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
            credits:{
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            exporting: {
              enabled: false,  
            },

            series: []
        };
        
        $.getJSON("js/Comparaison.json", function(json) {
        options.xAxis.categories = json[0]['data'];
        options.series[0] = json[1];
        options.series[1] = json[2];
        options.series[0].color = "#345468";
        options.series[1].color = "#f15a25"
        chart = new Highcharts.Chart(options);
        });
    });
});