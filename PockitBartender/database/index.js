
var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAj4gBW8ejKsPKk7CaqANi9nSNKKYxNNZQ",
    authDomain: "pockitbartender.firebaseapp.com",
    databaseURL: "https://pockitbartender.firebaseio.com",
    projectId: "pockitbartender",
    storageBucket: "pockitbartender.appspot.com",
    messagingSenderId: "572305886962"
};
firebase.initializeApp(config);

var db = firebase.firestore();
module.exports = db;