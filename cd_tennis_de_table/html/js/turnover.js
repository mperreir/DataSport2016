"use strict"
function turnoverFemme() {
     $.getJSON('json/turnoverfemme.json', function(graph) {
		var optionsfemme = {
			title: {
				text: 'Turnover-Femme',
				x: -20 //center
			},
			subtitle: {
				text: 'Etudes Hyblab 2016',
				x: -20
			},
			xAxis: {
				categories: ['2012-2013', '2013-2014', '2014-2015']
			},
			yAxis: {
				title: {
                text: 'Nombre de personnes' 
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: ''
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
            },
            
             series: [{ name :'Femme', data: [0,0,0]}]
		};
        optionsfemme.series[0].data = graph.graph;
        console.log(optionsfemme.series[0].data);
        optionsfemme = $('#turnoverfemme').highcharts(optionsfemme);
        var chart = new Highcharts.Chart(optionsfemme);
    });
}

function turnoverHomme() {
     $.getJSON('json/turnoverhomme.json', function(graph) {
        var optionshomme = {
			title: {
				text: 'Turnover-Homme',
				x: -20 //center
			},
			subtitle: {
				text: 'Etudes Hyblab 2016',
				x: -20
			},
			xAxis: {
				categories: ['2012-2013', '2013-2014', '2014-2015']
			},
			yAxis: {
				title: {
                text: 'Nombre de personnes'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: ''
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
            },
			series: [{ name : 'Homme',data: [0,0,0]}]
		};
        optionshomme.series[0].data = graph.graph;
        console.log(optionshomme.series[0].data);
        optionshomme = $('#turnoverhomme').highcharts(optionshomme);
        var chart = new Highcharts.Chart(optionshomme);
    });
}