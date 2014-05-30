
//////////////////////////////////////////////////////////////////////////////////////
//MODULE MIT EINER VARIABLE EINBINDEN
//////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var routes = require('./routes');
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
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));//HIER WIRD DER STANDORT FÜR DIE STASTICHEN DATEIEN FESTGESTELLT
});
//////////////////////////////////////////////////////////////////////////////////////
//MÖGLICHEN ROUTEN DER APP-START
//////////////////////////////////////////////////////////////////////////////////////
app.get('/', routes.index);
app.get('/home', routes.index);
app.get('/home/data', routes.indexData);

app.get('/showItemDetails', routes.showItemDetails);
app.get('/showItemDetails/data', routes.showItemDetailsData);

app.post('/search', routes.search);

app.get('/register', routes.register);
app.post('/registerUser', routes.registerUser);

app.get('/loginPage', routes.loginPage);
//////////////////////////////////////////////////////////////////////////////////////
//MÖGLICHEN ROUTEN DER APP-END
//////////////////////////////////////////////////////////////////////////////////////

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
// JavaScript source code
