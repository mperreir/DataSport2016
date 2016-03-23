//S'EXECUTE VIA NODE.JS, lancer :
// node readData.js
//Ou run le fichier

var fs = require("fs"); //Module fs pour la lecture de fichiers
/*
var json = JSON.parse(fs.readFileSync("Data/skillsdata.json"));

var sports={};
var sport=[];
var tmp=0;
for (var i in json) {
   
    if (!sports[json[i].Sport]) {
        sports[json[i].Sport] = {};
        sport[tmp]=json[i].Sport;
    }
    for (var j in json[i]){
        if (j!="Sport"){
            tmp=json[i][j];
            tmp=tmp.split(',').map(Number);
            sports[json[i].Sport][j]=tmp;
        }
    }
}

console.log(sports);
*/


var json = JSON.parse(fs.readFileSync("Data/skillsdata_2.json")); //Lit (readFileSync) et parse (JSON.parse) les données
/*
 var res={
    
};
var resfin=[];
for(var sport in json){
    res={
        
    };
    for(var pays in json[sport]){
        if(json[sport][pays]==json[sport].Sport){
            res["Sport"]=json[sport].Sport;
        }
        else{
            if(!res[pays]){
               res[pays]={};
               for (var region in json[sport][pays]){
                   if(!res[pays][region]){
                       res[pays][region]=(json[sport][pays][region]).split(',').map(Number);
                   }
                   
                }
           
                
            }
        } 
        
    }
    resfin.push(res);
 
   
}
   console.log(resfin);
 */   
var retour={
  'Skills':{
      'Total':{
          
      }
  }  
};
var res={
    
};
var tmp=[];
for(var sport in json){
    res={};
    for(var pays in json[sport]){
        if(json[sport][pays]==json[sport].Sport){
            //res[json[sport].Sport]={};
            tmp=json[sport].Sport
        }
        else{
            if(!res[pays]){
               res[pays]={};
               
               for (var region in json[sport][pays]){
                   if(!res[pays][region]){
                       res[pays][region]=(json[sport][pays][region]).split(',').map(Number);
                   }
                }
            }
        }
    }
    retour.Skills.Total[tmp]=res;
}

//console.log(retour.Skills.Total["Galice"]);