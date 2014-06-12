var db = require ('./../core/datenbank');
var cart = require ('./../core/cart');
//////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////
var tablet = null;
var data =null;
exports.cart = function(req, res)
{
 
    var id =req.query.id;
    var queryRequest = "SELECT name,hersteller,urlweb,preis FROM  tablet WHERE id = "+id;
    db.open();
    db.CONNECTION.query(queryRequest,function(err,rows,fields)
    {
      if(err)//wenn etwas mit der Abfrage nicht stimmt,dann geben wir ein fehler meldung aus

            {
             console.log('Fehler:'+err);
             return;
            }
            //sonst,ist die Abfrage erfolreich.dann werden die Ergebnisse der Abfrage in Json zurückgegeben,
             //damit ANGULAR.JS sie verarbeiten kann
              data =
             {
                 item:rows[0],
                 menge :1  
             } 
     
             tablet=rows[0]   ; 
             res.sendfile('./views/addToCart.html');
            // res.render("addToCart")
            
     });
     db.close();
};
exports.cartData = function(req, res)
{
    res.json(tablet); 
};
///////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////
