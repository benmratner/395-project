var firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyDYi46QDv2PEocHmaJSj7cYMiKJT5G9EOA",
    authDomain: "harmonizr-a589f.firebaseapp.com",
    databaseURL: "https://harmonizr-a589f.firebaseio.com",
    storageBucket: "harmonizr-a589f.appspot.com",
};
var app = firebase.initializeApp(firebaseConfig);
var database = firebase.database()

var fb = {
    fb: app,
    database: database
}



module.exports = {
    fb,
    database,
}