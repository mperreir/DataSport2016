var app = angular.module('hyblabApp');

/*Whole page Controller*/

app.controller('MainCtrl', function ($scope) {
    
    $scope.x = "Jonathan Yue Chun";
   
});

/*Intro controller*/

app.controller('IntroCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    /*FIRST GRAPH*/
    $scope.firstGraphLegend = ['DDJS'];
    $scope.someVar = [];
    $scope.firstGraphData = [[]];
    $scope.labels2 = [];
    $http.get('hyblabData/data.json').success(function(data) {
        console.log('success');   
        $scope.someVar = data;
        $timeout(firstGraphInit, 500);
    });
    function firstGraphInit () {
        //console.log(JSON.stringify($scope.someVar))
        //console.log($scope.someVar[0].annee);
        
        for (var i = 0; i < $scope.someVar.length; i++) {
            //console.log($scope.someVar[i].annee + " " + $scope.someVar[i].creation);
            $scope.labels2.push($scope.someVar[i].annee.toString());
            $scope.firstGraphData[0].push($scope.someVar[i].creation);
        }
    };
    
    $scope.update1996 = function () {    
        $scope.labels2 = ["1996"];
        $scope.graphInformation = $scope.textList[0].text;
    }
    $scope.update1997 = function () {
        $scope.labels2 = ["1996", "1997"];
        $scope.graphInformation = $scope.textList[1].text;
    }
    $scope.update1998 = function () {
        
        $scope.labels2 = ["1996", "1997", "1998"];
        $scope.graphInformation = $scope.textList[2].text;
    };
    $scope.onClick = function () {
        $scope.labels2 = [];
        for (var i = 1996; i < 2015; i++){
            $scope.labels2.push(i.toString());
        }; 
    }

    /*END*/
    
    /*DYNAMIC TEXT*/
    $scope.textList = [
        {id: 1, text: "This is a test!"},
        {id: 2, text: "Hope you like it :)"},
        {id: 3, text: "thank you for trying me ^^"},
        {id: 4, text: "'<h1>'Hello'</h1>'"}
    ];
    $scope.graphInformation = "Some random Text";
    
    /*END*/
    
    /*TEST*/
    
    $scope.graph = {'width': 500, 'height': 500};
    $scope.circles = [
    {'x': 15, 'y': 20, 'r':30},
    {'x': 35, 'y': 60, 'r':20},
    {'x': 55, 'y': 10, 'r':40},
    ];
    var updt = function () {
        $scope.circles = $scope.circles*2;
        console.log($scope.circles);
    };
    /*END*/
    
   
    $scope.y = "yue chun";
    
    $scope.salesData = [
    {hour: 1,sales: 54},
    {hour: 2,sales: 66},
    {hour: 3,sales: 77},
    {hour: 4,sales: 70},
    {hour: 5,sales: 60},
    {hour: 6,sales: 63},
    {hour: 7,sales: 55},
    {hour: 8,sales: 47},
    {hour: 9,sales: 55},
    {hour: 10,sales: 30}
    ];
    
    $scope.transitionState = "active"
    $scope.cards = ["H1", 'h2', '55', 'aa'];
    
      
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
    ];
    
}]);

/*Page one controller*/

app.controller('PageOneCtrl', function ($scope) {
    
    $scope.z = "page tw0";
    $scope.a = false;
    $scope.setTrue = function () {
        $scope.a = true;
    };
    $scope.setFalse = function () {
        $scope.a = false;
    };
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
    
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];
});

/*Page two controller*/

app.controller('PageTwoCtrl', function ($scope) {
  
    $scope.labels2 = [];
    for (var i = 1996; i < 2015; i++){
        $scope.labels2.push(i.toString());
    };
    
    $scope.series = ['DDJS', 'Series B'];
    $scope.data = [
        [12 ,11, 11, 8, 5, 7, 3, 10, 7, 7, 3, 11, 9, 14, 10, 10, 9, 14, 19, 28]
    ];
    
    $scope.labels3 = ["1996", "1997", "1998"];
    $scope.data2 = [[12,12, 11, 11]];
    $scope.temp = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    $scope.click = false;
    /*$scope.onClick = function (points, evt) {
         console.log(points, evt);
        if ($scope.click == true) {
            
            first();
            console.log("true");
            
        } else {
            second();
            console.log("false");
        };
        
  };
    
    function first () {
        $scope.labels2 = ["1996", "1997", "1998"];
        $scope.click = false;
        console.log($scope.labels2);
    }
    
    function second () {
        $scope.click = true;  
               
        $scope.labels2 = [];
        for (var i = 1996; i < 2015; i++){
        $scope.labels2.push(i.toString());
        };
        console.log($scope.labels2);
    };*/
    $scope.onClick = function () {
        $scope.labels2 = [];
        for (var i = 1996; i < 2015; i++){
            $scope.labels2.push(i.toString());
        }; 
    }
    
    $scope.update1996 = function () {    
        $scope.labels2 = ["1996"];
    }
    $scope.update1997 = function () {
        $scope.labels2 = ["1996", "1997"];
    }
    $scope.update1998 = function () {
        
        $scope.labels2 = ["1996", "1997", "1998"];  
    };
        
});



