
(function()
{
var myApp =angular.module('store',[]);//UNSER MODULE WIRD ERSTELLT

//CONTROLLER FÜR DIE SEITE HOME.JADE
 myApp.controller ('DataController',function($http,$location){
           //IN DIESER CONTROLLER HOLEN WIR DIE DATEN ,DIE WIR AN DIE SEITE home/data ALS JSON 
           //GESCHICKT HABEN,DANK EINER HTTP ABFRAGE
          var alias =this; 
          //
          alias.filter= new Array();
          alias.filter.os= new Array();
          alias.filter.hersteller= new Array();


          this.query=null;
          $http.get('home/data').success(function(data) 
              {
               alias.tablets = data;//DIE DATEN AUS DER HTTP-ABFRAGE WERDEN 
                                    //IN DER VARIABLE TABLETS VON DATACONTROLLER GESPEICHERT.
                                    //DANK DATACONTROLLER BESTEHT DIE MÖGLICHKEIT,DASS WIR 
                                    // AUF DIE "TABLETS" VARIABLE DURCH ANGULAR DIREKTIVEN
                                    //IM HTML ZUGREIFFEN 

                alias.hersteller =new Array();//wir speichern die unterschiedlichen Hersteller ,die in unserer DB sind
                for (var i = data.length - 1; i >= 0; i--)
                 {
                     if((contains(alias.hersteller,data[i].hersteller))==false)
                      alias.hersteller.push(data[i].hersteller);
                };
              });
 alias.osFilter=function(os,value)
          {
                   
                   if(value==true)
                    alias.filter.os.push(os);
                   else
                   {
                    for (var i = 0; i< alias.filter.oslength; i++) {
                      if(alias.filter.os[i]==os)
                      {
                        alias.filter.os.splice(i,1);
                      }
                    };
                   }
console.log(alias.filter);
          }
alias.herstellerFilter=function(hersteller,value)
          {
                   
                   if(value==true)
                    alias.filter.hersteller.push(hersteller);
                   else
                   {
                    for (var i = 0; i< alias.filter.hersteller.length; i++) {
                      if(alias.filter.hersteller[i]==hersteller)
                      {
                        alias.filter.hersteller.splice(i,1);
                      }
                    };
                   }
console.log(alias.filter);
          }
alias.filter = function()
{
$http({
  method: 'post',
  url: '/home/query',
  data :alias.filter
}).success(function(data, status, headers, config) {
  // data contains the response
  // status is the HTTP status
  // headers is the header getter function
  // config is the object that was used to create the HTTP request
}).error(function(data, status, headers, config) {
});
}
        });
        
//CONTROLLER FÜR DIE SEITE SHOWITEMDETAILS.JADE
 myApp.controller ('OneDataController',function($http){

          var alias =this; 
    
          //
          $http.get('showItemDetails/data').success(function(data) 
              {

               alias.tablet = data;
               
               //wir prüfen ,ob der speicher dieses Tablet erweiterbar
               //danach stecken wir das Ergebnis in einer Variable von diesem Controller
               if(data.erweiterbar==0 || data.erweiterbar==null || data.erweiterbar==""  )
                alias.erweiterbar ="Nein"
               else
                alias.erweiterbar ="Ja bis "+data.erweiterbarbis+" GO";

              });


         
        
        });
//CONTROLLER FÜR DIE SEITE ADDTOCART.JADE
 myApp.controller ('OneDataInCartController',function($http){

          var alias =this; 
          //
          $http.get('addToCart/data').success(function(data) 
              {

               alias.tablet = data;
               console.log(data);
              });
        
        });
 //CONTROLLER FÜR DIE ANIMATION VON TABS IN SHOWITEMDETAILS
 myApp.controller ('TabController',function(){

         this.tab =2;

        
        });
myApp.controller('RegisterController',function(){
          
            this.firstname="";
            this.lastname="";
            this.email="";

        });

             function contains(tab, obj)//prüft ob ein array ein object behaelt
             {
              if(tab.length>0)
              {
                for (var i = 0; i < tab.length; i++) {
                    if (tab[i] === obj) {
                        return true;
                    }
                }
                return false;
              }
              else
              {
                return false;
              }
             }
    }());


