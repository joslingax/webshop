////////////////////////////////////////////////////////////////////
///  DATENBANK KONFIGURATION START
///////////////////////////////////////////////////////////////////
/*
*DIESER TEIL DES CODES IST FÜR DIE INTERAKTIONEN MIT UNSER MY SQL DATENBANK
ZUSTÄNDIG.HIER WIRD DIE VERBINDUNG MIT DER DB ERSTELLT
*/
var db = require('mysql'); //wir binden die Variable db mit dem Modul mysql ein
var CONNECTION = null;
var configurationData = //ein JSON variable für  die Zugangsdaten zum Datenbankserver
    {
        host: 'mysql.ice-server.com',
        user: 'joslin',
        password: 'gbnf5Vg5',
        database: 'joslin'
    };
//wir erstellen eine Verbingdung mit der DB
exports.open = function openConnection()//um die verbindung zur DB zu öffnen
{
    this.CONNECTION = db.createConnection(configurationData);
    this.CONNECTION.connect(function (err) {
        console.log('Aufbau der Verbindung...');
        if (err)//wenn es ein Fehler gibt,dann wird eine Fehlermeldung ausgegeben
        {
            console.log('Die Aufbau der Verbindung mit der DB war nicht moeglich');
            console.log('Grund : ' + err);
            return;
        }//falls alles Ok ist,geben wir dann die Gute Nachricht aus
        console.log('Die Verbindung mit der Datenbank war erfolgreich: ' + configurationData.host);

    });
}
exports.close = function closeConnection()//um die verbindung zur DB zu schliessen
{
    console.log("Abbau der Verbindung...");
    this.CONNECTION.end();
    console.log("Die Verbindung wurde gesschlossen");
}
module.exports.CONNECTION =CONNECTION;//wir exportieren die Variable

