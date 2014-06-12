////////////////////////////////////////////////////////////////////
///  routes/index.js verwaltet die möglichen Routen der Application.
/// Jedes Route wird an das entsprechende View weitergeleitet.
/// In der Datei wird auch eine  Verbindung mit der DB eingerichtet,die
///Alle abgefragte Daten aus der DB durch spezielle Routen fuer Angular.js
//zur verfügung gestellt
///////////////////////////////////////////////////////////////////

var db = require ('./../core/datenbank');

exports.index = function(req, res)
{

  console.log("nombre de tablet dans la corbeille:"+req.session.cart.length);
  res.sendfile('./views/home.html'); //zeig das View an
 // res.render('home'); //zeig das View an
};
exports.indexData = function(req, res)
{
   
    var data;
     db.open();
    //Hier wird ein query an der DB geschickt
    //damit wir alle Tablets aus der Datenbak extrahieren können
    var queryRequest = "SELECT * from tablet";
    db.CONNECTION.query(queryRequest,function(err,rows,fields)
    {
      if(err)//wenn etwas mit der Abfrage nicht stimmt,dann geben wir ein fehler meldung aus

            {
             console.log('Fehler indexData:'+err);
             return;
            }//sonst,ist die Abfrage erfolreich.dann werden die Ergebnisse der Abfrage in Json zurückgegeben,
             //damit ANGULAR.JS sie verarbeiten kann
             data=rows;
             res.json(data);//Gibt die Daten aus der DB ans View als JSON zurueck
                   //DAMIT ANGULAR.JS PER HTTP-ABFRAGE SIE BENUTZEN KANN
        
    });
    db.close();
};
///////////////////////////////////////////////////////////////////
//ROUTE FÜR HOME-SEITE-END
//////////////////////////////////////////////////////////////////

exports.indexDataFilter = function(req, res)
{
   
    var data;
     db.open();
    //Hier wird ein query an der DB geschickt
    //damit wir alle Tablets aus der Datenbak extrahieren können
    var queryRequest = "SELECT * FROM tablet WHERE hersteller ='apple'";
    db.CONNECTION.query(queryRequest,function(err,rows,fields)
    {
      if(err)//wenn etwas mit der Abfrage nicht stimmt,dann geben wir ein fehler meldung aus

            {
             console.log('Fehler bei indexDataFilter :'+err);
             return;
            }//sonst,ist die Abfrage erfolreich.dann werden die Ergebnisse der Abfrage in Json zurückgegeben,
             //damit ANGULAR.JS sie verarbeiten kann
             data=rows;
             res.json(data);//Gibt die Daten aus der DB ans View als JSON zurueck
                   //DAMIT ANGULAR.JS PER HTTP-ABFRAGE SIE BENUTZEN KANN
        
    });
    db.close();
};
