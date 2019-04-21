'use strict';
var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET users listing. */

router.get('/:name', function (req, res) {

    var name = req.params.name;

    var drinkCol = db.collection('drinks');

    drinkCol.doc(name).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('Does not exist');
            } else {
                console.log(doc.data());
                res.send(doc.data());
            }
        })
        .catch(err => {
            console.log('something bad');
            res.send('could not find drink.')
        });

});




router.post('/', function (req, res) {
    console.log(req.body.name);
    var name = req.body.name;
    var recipe = req.body.recipe;

    var drinkCol = db.collection('drinks');

    drinkCol.doc(name).set({
        name,
        recipe
    });

    res.send({ name, recipe });

});

router.post('/filter', function (req, res, next) {
    var searchTerm = req.body.searchTerm.toLowerCase();
    var drinksRef = db.collection('drinks');
    var foundDrinks = [];

    drinksRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                var key = doc.id.toLowerCase();
                if (key.indexOf(searchTerm) >= 0) {
                    foundDrinks.push(doc.data())
                }
            });
            res.send(foundDrinks);
        })
        .catch(err => {
            console.log('Error getting documents', err)

        });
});



module.exports = router;
