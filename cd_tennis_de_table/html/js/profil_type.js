function profil_sexe() {
     $.getJSON('json/sexe.json', function(sexe) {
	var femme = [];
	var homme = [];
	 for (var i = 0; i < sexe.sexe.length; i++)
		{
        	femme.push((sexe.sexe)[i].Femme);
        	homme.push((sexe.sexe)[i].Homme);
        }
        
		var profil_sexe = {
				chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
        	},
        	title: {
        	 	text: 'Sexe des licenciés'
    	 	},
	        tooltip: {
	            pointFormat: '<b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: '',
	            colorByPoint: true,
	            data: [{
	                name: 'Femmes',
	                y: (sexe.sexe)[0].Femme//femme[1]
	        		 }, {
	                name: 'Hommes',
	                y: (sexe.sexe)[1].Homme//homme[1],
	                
	            }]
	        }]
    };
       
        profil_sexe = $('#sexe').highcharts(profil_sexe);
        var chart = new Highcharts.Chart(profil_sexe);
    });
}



function myChart()
{
	var categories = [];
	var femme = [];
	var homme = [];
	$.getJSON("json/age.json",function(data)
	{
		for (var i = 0; i < data.age.length; i++)
		{
            categories.push((data.age)[i].Pourcentage);
        	femme.push(parseFloat((data.age)[i].Femme));
        	homme.push(-parseFloat((data.age)[i].Homme));
        }
    	
    	$('#age').highcharts({
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Pyramide des âges'
			},
			xAxis: [{
				categories: categories,
				reversed: false,
				labels: {
					step: 1
				}
			}, { // mirror axis on right side
				opposite: true,
				reversed: false,
				categories: categories,
				linkedTo: 0,
				labels: {
					step: 1
				}
			}],
			yAxis: {
				title: {
					text: null
				},
				labels: {
					formatter: function () {
						return Math.abs(this.value) + '%';
					}
				}
			},
	
			plotOptions: {
				series: {
					stacking: 'normal'
				}
			},
	
			tooltip: {
				formatter: function () {
					return '<b>' + this.series.name + ', Tranche de : ' + this.point.category + ' ans</b><br/>' +
						'Pourcentage de pratiquants: ' + Highcharts.numberFormat(Math.abs(this.point.y), 2) + '%';
				}
			},
	
			series: [{
				name: 'Homme',
				data: homme
			}, {
				name: 'Femme',
				data : femme
			}]
		});
	});
}