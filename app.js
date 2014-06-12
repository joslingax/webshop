//////////////////////////////////////////////////////////////////////////////////////
//MODULE MIT EINER VARIABLE EINBINDEN
//////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var routesHome = require('./routes/home');
var routesRegister = require('./routes/register');
var routesSearch = require('./routes/search');
var routesSelectedItem = require('./routes/showSelectedItem');
var routesSignIn = require('./routes/SignIn');
var routesToCart= require('./routes/toCart');
var cart = require('./core/cart');

var http = require('http');
var path = require('path');
var app = express();//UNSER APP WIRD ERSTELLT

//////////////////////////////////////////////////////////////////////////////////////
//CONFIGURATION DER APP
//////////////////////////////////////////////////////////////////////////////////////
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));//DIE DATEIEN DIE FUER DIE VIEWS ZUSTANDIG SIND,SIND IM ORDNER 'VIEWS'
    app.set('view engine', 'jade');                 //DAS VIEW ENGINE IST DAS TEMPLATE JADE
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.favicon());
    app.use(express.urlencoded());
    app.use(express.cookieParser());//DAMIT IST ES MÖGLICH,DIE COOKIE VARIABLEN ZU BENUTZEN
    app.use(express.session({secret:'this is a secret'}));//DAMIT IST ES MÖGLICH,DIE SESSION VARIABLEN ZU BENUTZEN
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));//HIER WIRD DER STANDORT FUER DIE STASTICHEN DATEIEN FESTGESTELLT
});

cart.createCart(app);
//////////////////////////////////////////////////////////////////////////////////////
//MOEGLICHEN ROUTEN DER APP-START
//////////////////////////////////////////////////////////////////////////////////////
app.get('/', routesHome.index);
app.get('/home', routesHome.index);
app.get('/home/data', routesHome.indexData);
app.post('/home/query',routesHome.indexDataFilter);


app.get('/showItemDetails', routesSelectedItem.showItemDetails);
app.get('/showItemDetails/data', routesSelectedItem.showItemDetailsData);

app.post('/search', routesSearch.search);

app.get('/register', routesRegister.register);
app.post('/registerUser', routesRegister.registerUser);
app.get('/registerConfirm', routesRegister.registerConfirm);

app.get('/loginPage', routesSignIn.loginPage);
app.get('/addToCart', routesToCart.cart);
app.get('/addToCart/data', routesToCart.cartData);


//////////////////////////////////////////////////////////////////////////////////////
//MoeGLICHEN ROUTEN DER APP-END
//////////////////////////////////////////////////////////////////////////////////////

app.use(app.router);// AppRouter soll am Ende des Codes sein vor der Listen...
                             //anweisung,sonst wird die Session objekten nicht erkannt

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
// JavaScript source code
