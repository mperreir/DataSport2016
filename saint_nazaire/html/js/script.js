$(document).ready(function(){
  $(".main").onepage_scroll({
    sectionContainer: "section",
    responsiveFallback: 600,
    pagination: true,
    easing: "ease",
    keyboard: true,
    loop: true
  });
});

$.getJSON("data/saint_nazaire.json", function(data){
  $('#container_figure1').highcharts({
    
    chart: {
      type: 'column',
      color: 'red',
      style: {
            color: "white"
        }
    },
    title: {
      text: 'Nombre de licences en sport Nautique à St-Nazaire',
      style: {
            color: "white"
        }
    },
    xAxis: {
      categories: data.sports,
      style: {
                color: 'white'
            },
      labels: {
            style: {
                color: 'white'
            }
        }
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Nombre de licenciés',
        style: {
            color: "white"
        }
      },
      
        
      labels:
      {
          style: {
            color: "white"
        }
      }
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
      }
    },
    plotOptions: {

      column: {
        stacking: 'normal'
      }
    },
    series: [data.femmes,data.hommes]
  });
})

$.getJSON("data/cities.json", function(d) {
  var saintNazaire = d.filter(function(v){
    return v.ville == "SAINT-NAZAIRE";
  })

  var data = saintNazaire[0].sports.map(function(row){
    return row.data;
  })

  var drillDown = saintNazaire[0].sports.map(function(row){
    return row.drilldown;
  })

  $('#container_saint_nazaire').highcharts({
    chart: {
      type: 'column', 
      style: {
            color: "white"
        }
    },
    title: {
      text: 'Pourcentage de la population st-Nazairienne pratiquante les sports nautiques',
      style: {
            color: "white"
        }
      
    },
    
    xAxis: {
      type: 'category',
      style: {
                color: 'white'
            },
      labels: {
            style: {
                color: 'white'
            }
        }
    },
    yAxis: {
      title: {
        text: 'percent licenciés/population',
        style: {
            color: "white"
        }
      },
      labels:
      {
          style: {
            color: "white"
        }
      }

    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: data,
      dataLabels: {
        color: "white"
      }  
    }],
    drilldown: {
      series: drillDown

    }
  });

  var changeVille = function(ville){
    var selectedVille = d.filter(function(v){
      return v.ville == ville;
    })

    var data = selectedVille[0].sports.map(function(row){
      return row.data;
    })

    var drillDown = selectedVille[0].sports.map(function(row){
      return row.drilldown;
    })


    $('#container_selected_ville').highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Pourcentage de la population de '+ville+' pratiquant les sports nautiques',
        style: {
            color: "white"
        }
      },
      xAxis: {
        style: {
                color: 'white'
            },
        type: 'category',
        labels: {
            style: {
                color: 'white'
            }
        }
        
      },
      yAxis: {
        title: {
          text: 'percent licenciés/population',
          style: {
            color: "white"
        }
        },
      labels:
      {
          style: {
            color: "white"
        }
      }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: data
      }],
      drilldown: {
        series: drillDown

      }
    });
  }

  var text = {
    "LORIENT":"Concernant les activités nautiques et du littoral, Saint-Nazaire s'inscrit principalement, en termes de licenciés, dans l'aviron; la voile venant en seconde position. Les licenciés de voile se concentrent néanmoins dans les villes de La Rochelle, Vannes, Lorient et Saint Brieux, où la discipline se place leader par rapport au nombre d'habitants. La voile prédomine également à Brest mais cette ville reste néanmoins pluridisciplinaire avec un ratio de licenciés/habitants équivalents pour les différentes activités nautiques proposées.",
    "VANNES":"Concernant les activités nautiques et du littoral, Saint-Nazaire s'inscrit principalement, en termes de licenciés, dans l'aviron; la voile venant en seconde position. Les licenciés de voile se concentrent néanmoins dans les villes de La Rochelle, Vannes, Lorient et Saint Brieux, où la discipline se place leader par rapport au nombre d'habitants. La voile prédomine également à Brest mais cette ville reste néanmoins pluridisciplinaire avec un ratio de licenciés/habitants équivalents pour les différentes activités nautiques proposées.",
    "BREST":"Concernant les activités nautiques et du littoral, Saint-Nazaire s'inscrit principalement, en termes de licenciés, dans l'aviron; la voile venant en seconde position. Les licenciés de voile se concentrent néanmoins dans les villes de La Rochelle, Vannes, Lorient et Saint Brieux, où la discipline se place leader par rapport au nombre d'habitants. La voile prédomine également à Brest mais cette ville reste néanmoins pluridisciplinaire avec un ratio de licenciés/habitants équivalents pour les différentes activités nautiques proposées.",
    "SAINT-BRIEUC":"Concernant les activités nautiques et du littoral, Saint-Nazaire s'inscrit principalement, en termes de licenciés, dans l'aviron; la voile venant en seconde position. Les licenciés de voile se concentrent néanmoins dans les villes de La Rochelle, Vannes, Lorient et Saint Brieux, où la discipline se place leader par rapport au nombre d'habitants. La voile prédomine également à Brest mais cette ville reste néanmoins pluridisciplinaire avec un ratio de licenciés/habitants équivalents pour les différentes activités nautiques proposées.",
    "ROCHELLE":"Concernant les activités nautiques et du littoral, Saint-Nazaire s'inscrit principalement, en termes de licenciés, dans l'aviron; la voile venant en seconde position. Les licenciés de voile se concentrent néanmoins dans les villes de La Rochelle, Vannes, Lorient et Saint Brieux, où la discipline se place leader par rapport au nombre d'habitants. La voile prédomine également à Brest mais cette ville reste néanmoins pluridisciplinaire avec un ratio de licenciés/habitants équivalents pour les différentes activités nautiques proposées."
  }

  $('.menu-ville').click(function(event){
    $('#ville_para').text(text[$(event.target).text()])
    
    changeVille($(event.target).text());
  })

})

/*$(".map-point").click(function(event){
  $('#map-point-info').html("<p>"+$(event.currentTarget).attr("id")+"</p>");
})*/

// figure 1


