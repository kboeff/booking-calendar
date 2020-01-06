var http = require('http');
var fs = require('fs');

const PORT = 8880; 

fs.readFile('./app.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);

    console.log(`Server running on port ${PORT}`);
});


var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://booking-app-brigi.firebaseio.com"
});

var firebase = require("firebase");
var events = firebase.database().ref('/events');
events.on('value', function(snapshot) {
  console.log('new db:', snapshot.val());
});
