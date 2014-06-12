var db = require ('./../core/datenbank');


//////////////////////////////////////////////////////////////////
//ROUTE FÜR  DIE REGISTRIERUNG-SEITE-START
//////////////////////////////////////////////////////////////////
exports.register = function(req, res)
{
  res.render('register',{titel:'Registrierung'}); //zeig das View an
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
            db.open();
            var queryInsert ="INSERT INTO `joslin`.`user_gotab` (`vorname`, `nachname`, `email`, `strasse`, `nr`, `plz`, `stadt`, `geschlecht`, `passwort`) VALUES ('"+firstname+"','"+lastname+"','"+email+"','"+password+"','"+street+"','"+nummer+"','"+plz+"','"+city+"','"+geschlecht+"')";
            db.CONNECTION.query(queryInsert,function(err,result)
                {
                    if(err)
                        console.log("FEHLER: "+ err);
                    else//
                     res.redirect('/registerConfirm');
                 })  
            db.close();
        }

  
};

 exports.registerConfirm = function(req,res)
{
    //Wenn unser User in der DB erfolgreich vorgenommen wurde, zeigen wir eine Bestätigungsseite an ,die 
    // die glückliche Mitteillung ankündigt
    res.render('registerConfirm',{titel:'Registrierung war erfolgreich'});
 }
///////////////////////////////////////////////////////////////////
//ROUTE FÜR DIE REGISTRIERUNG-SEITE-END
//////////////////////////////////////////////////////////////////
