////////////////////////////////////////////////////////////////////
///  routes/index.js verwaltet die möglichen Routen der Application.
/// Jedes Route wird an das entsprechende View weitergeleitet.
/// In der Datei wird auch eine  Verbindung mit der DB eingerichtet,die
///Alle abgefragte Daten aus der DB durch spezielle Routen fuer Angular.js
//zur verfügung gestellt
///////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////
///  DATENBANK KONFIGURATION START
///////////////////////////////////////////////////////////////////
/*
*DIESER TEIL DES CODES IST FÜR DIE INTERAKTIONEN MIT UNSER MY SQL DATENBANK
ZUSTÄNDIG.HIER WIRD DIE VERBINDUNG MIT DER DB ERSTELLT
*/
 var db= require('mysql'); //wir binden die Variable db mit dem Modul mysql ein
 var connection = null;
 var configurationData = //ein JSON variable für  die Zugangsdaten zum Datenbankserver
     {
            host:'mysql.ice-server.com',
            user:'joslin',
            password:'gbnf5Vg5',
            database:'joslin'
      };
      //wir erstellen eine Verbingdung mit der DB
function openConnection()//um die verbindung zur DB zu öffnen
{
      connection =db.createConnection(configurationData);
      connection.connect(function(err)
          {
                  console.log('Aufbau der Verbindung...');      
              if(err)//wenn es ein Fehler gibt,dann wird eine Fehlermeldung ausgegeben
                  {
                  console.log('Die Aufbau der Verbindung mit der DB war nicht moeglich');
                  console.log('Grund : '+err);
                  return;
                  }//falls alles Ok ist,geben wir dann die Gute Nachricht aus
                  console.log('Die Verbindung mit der Datenbank war erfolgreich: '+configurationData.host);

          });
 }
 function closeConnection()//um die verbindung zur DB zu schliessen
{
      console.log("Abbau der Verbindung...");
      connection.end();
      console.log("Die Verbindung wurde gesschlossen");
 }
////////////////////////////////////////////////////////////////////
///  DATENBANK KONFIGURATION END
///////////////////////////////////////////////////////////////////

//ROUTE FÜR DIE HOME-SEITE-START
//////////////////////////////////////////////////////////////////

exports.index = function(req, res)
{
  openConnection();
  res.render('home'); //zeig das View an
};
exports.indexData = function(req, res)
{
 
    var data;
    //Hier wird ein query an der DB geschickt
    //damit wir alle Tablets aus der Datenbak extrahieren können
    
    var queryRequest = "SELECT * from tablet";
    connection.query(queryRequest,function(err,rows,fields)
    {
      if(err)//wenn etwas mit der Abfrage nicht stimmt,dann geben wir ein fehler meldung aus

            {
             console.log('Fehler:'+err);
             return;
            }//sonst,ist die Abfrage erfolreich.dann werden die Ergebnisse der Abfrage in Json zurückgegeben,
             //damit ANGULAR.JS sie verarbeiten kann
             data=rows;
             res.json(data);//Gibt die Daten aus der DB ans View als JSON zurueck
                   //DAMIT ANGULAR.JS PER HTTP-ABFRAGE SIE BENUTZEN KANN
        
    });
    closeConnection();
};
///////////////////////////////////////////////////////////////////
//ROUTE FÜR HOME-SEITE-END
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//ROUTE FÜR DIE SHOWITEMDETAILS-SEITE-START
//////////////////////////////////////////////////////////////////
var dataFromshowItemDetailsId = null;
exports.showItemDetails = function(req, res)
{
    var id =req.query.id;
    var queryRequest = "SELECT * FROM  tablet WHERE id = "+id;
    openConnection();
    connection.query(queryRequest,function(err,rows,fields)
    {
      if(err)//wenn etwas mit der Abfrage nicht stimmt,dann geben wir ein fehler meldung aus

            {
             console.log('Fehler:'+err);
             return;
            }//sonst,ist die Abfrage erfolreich.dann werden die Ergebnisse der Abfrage in Json zurückgegeben,
             //damit ANGULAR.JS sie verarbeiten kann
             dataFromshowItemDetailsId=rows;
 
        
    });
  closeConnection();
  res.render('showItemDetails'); //zeig das View an

};
exports.showItemDetailsData = function(req, res)
{
    res.json(dataFromshowItemDetailsId);
};
///////////////////////////////////////////////////////////////////
//ROUTE FÜR DIE SHOWITEMDETAILS-SEITE-END
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//ROUTE FÜR  DIE SUCHEN-SEITE-START
//////////////////////////////////////////////////////////////////
exports.search = function(req, res)
{
    console.log(req.body.search);
  res.render('search',{query:req.body.search}); //zeig das View an
};
///////////////////////////////////////////////////////////////////
//ROUTE FÜR DIE SUCHEN-SEITE-END
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//ROUTE FÜR  DIE REGISTRIERUNG-SEITE-START
//////////////////////////////////////////////////////////////////
exports.register = function(req, res)
{
  res.render('register'); //zeig das View an
};
//wir bearbeiten die Daten aus dem PostFormular fuer die Registrierung
exports.registerUser = function(req, res)
{
  //wir speichern die Werte der Eingafeldern in unterschiedlichen Variablen 
  //aus dem Request Objekt alias req
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var street = req.body.street;
  var nummer = req.body.nr;
  var plz =req.body.plz;
  var city =req.body.city;
  var geschlecht =true;

  console.log("nummer:"+nummer);
  //nachdem wir die Daten des neuen user haben,sollen wir jetzt überprufen ,ob die bestimmte Bedingungen
  //respektieren,bevor wir sie in der DB speichern

  var err = new Array(); ;//Dient zur Speicherung der fehlermeldungen
  var Email_Regex =/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/ //REGEX FÜR E-MAIL aus http://blog.trojanhunter.com/2012/09/26/the-best-regex-to-validate-an-email-address/
  var number_regex =/^-?\d+$/ // REGEX für die Ganzzahlen 

  //zuerst dürfen die nicht leer sein
  if(firstname=="" || lastname=="" || email==""|| password==""|| password2==""|| street=="" || nummer=="" || city=="" || plz=="")
      { 
          err.push("Alle EingabeFelder sollen nicht leer sein!!");
          console.log("Alle EingabeFelder sollen nicht leer sein!!")
      }
  //password soll = password2 sein
   if(password!=password2)
       err.push("Die EingabeFelder für das Passwort stimmen nicht überein");
  //wir prüfen ob ,die Email unser Regex entspricht
   if(!email.match(Email_Regex))
       err.push("Ihre E-mail ist ungültig");
   //wir prüfen ob ,die PLZ 5-stellig ist
   if(plz.length!=5)
       err.push("Die Plz soll aus 5 Ziffern bestehen");

   var user = //variable für die userDaten
   {
       firstname:firstname,
       lastname:lastname,
       email:email,
       password:password,
       street:street,
       nummer:nummer,
       plz:plz,
       city:city,
       geschlecht:geschlecht
    }

    if(err.length>0)//wenn es ein paar Fehler gibt
        {
           //Kehren wir an die Registrierung-Seite zurück 
           //Dabei schicken wir auch ans  JADE view ein Array,das die beschreibung der unterschiedlichen Fehlern enthaelt
           // und die zuvor vom User eingegebenen Daten
           res.render('register',{title:"Registrierung", err:err,hasFailed:true,firstname:user.firstname,lastname:user.lastname,email:user.email,password:user.password,street:user.street,nr:user.nummer,city:user.city,plz:user.plz}); 

        }
    else//falls alles ok ist
        {//speichern wir unser neues User in der Datenbank
            openConnection();
            var queryInsert ="INSERT INTO `joslin`.`user_gotab` (`vorname`, `nachname`, `email`, `strasse`, `nr`, `plz`, `stadt`, `geschlecht`, `passwort`) VALUES ('"+firstname+"','"+lastname+"','"+email+"','"+password+"','"+street+"','"+nummer+"','"+plz+"','"+city+"','"+geschlecht+"')";
            connection.query(queryInsert,function(err,result)
                {
                    if(err)
                        console.log("FEHLER: "+ err);
                    else//
                     res.redirect('/home');
                 })  
            closeConnection();
        }

  
};
///////////////////////////////////////////////////////////////////
//ROUTE FÜR DIE REGISTRIERUNG-SEITE-END
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//ROUTE FÜR  DIE REGISTRIERUNG-SEITE-START
//////////////////////////////////////////////////////////////////
exports.loginPage = function(req, res)
{
  res.render('loginPage'); //zeig das View an
};
///////////////////////////////////////////////////////////////////
//ROUTE FÜR DIE REGISTRIERUNG-SEITE-END
//////////////////////////////////////////////////////////////////
