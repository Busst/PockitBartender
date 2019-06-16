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
                //console.log(doc.data());
                res.send(doc.data());
            }
        })
        .catch(err => {
            console.log('something bad');
            res.send('could not find drink.')
        });

});




router.post('/', function (req, res) {
    var name = req.body.name;
    var recipe = req.body.recipe;
    var directions = req.body.directions;
    var rating = 0;
    var drinkCol = db.collection('drinks');

    drinkCol.doc(name).set({
        name,
        recipe,
        directions,
        rating


    });
    console.log({ name, recipe, directions, rating })
    res.send({ name, recipe, directions, rating });

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
                    
                    if (foundDrinks[foundDrinks.length-1].rating === undefined){
                        foundDrinks[foundDrinks.length-1].rating = 0;
                    }
                }
            });
            res.send(foundDrinks);
        })
        .catch(err => {
            console.log('Error getting documents', err)

        });
});

router.post('/upvote', function (req, res, next ) {
    var name = req.body.name;
    var deltaRating = req.body.rating;
    var id = req.body.user;
    var voteDir = req.body.vote;
    var drinkCol = db.collection('drinks');
    var userCol = db.collection('users');
    drinkCol.doc(name).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('Does not exist');
            } else {
                var directions = doc.data().directions;
                var recipe = doc.data().recipe;
                var rating;
                if (doc.data().rating === undefined || doc.data().rating === NaN) {
                    rating = 0;
                } else {
                    rating = doc.data().rating;
                }
                rating += deltaRating;
                drinkCol.doc(name).set({
                    name,
                    recipe,
                    directions,
                    rating
                });
                console.log({ name, recipe, directions, rating })
                console.log();
                res.send({ name, recipe, directions, rating });
            }
        })
        .catch(err => {

        });
    userCol.doc(id).get()
        .then(user => {
            console.log(user.data());
            var upvotedDrinks = user.data().upvotedDrinks;
            var downvotedDrinks = user.data().downvotedDrinks;
            if (upvotedDrinks === undefined){
                upvotedDrinks = "";
            }
            var downvotedDrinks = user.data().downvotedDrinks;
            if (downvotedDrinks === undefined){
                downvotedDrinks = "";
            }
            
            
            /*  
                
            
                
                if up but 2 then remove from downvoted add to up

                if down but -2 then remove from upvoted add to down
               

            */

            if (deltaRating > 0){
                if (voteDir === "up"){
                    if (upvotedDrinks.length === 0){
                        upvotedDrinks += name;
                    } else {
                        upvotedDrinks += "::" + name;
                    }
                } 
                if (deltaRating != "up" || deltaRating > 1) {
                    if (downvotedDrinks.length != 0){
                        downvotedDrinks = removeFromString(name, downvotedDrinks);
                    } 
                }
            } else {
                if (voteDir != "up") {
                    if (downvotedDrinks.length === 0){
                        downvotedDrinks += name;
                    } else {
                        downvotedDrinks += "::" + name;
                    }
                }

                if (voteDir === "up" || deltaRating < -1){
                    if (upvotedDrinks.length != 0){
                        upvotedDrinks = removeFromString(name, upvotedDrinks);
                    } 
                } 
                
            } 
            
            var email = user.data().email;
            var userName = user.data().userName;
            
            userCol.doc(id).set({
                id,
                email,
                userName,
                upvotedDrinks,
                downvotedDrinks
            });
            
        })
        .catch(err => {
            console.log(err);
        });
    
});

function removeFromString(name, str) {
    var strArray = str.split("::");  
    for (var i = 0; i < strArray.length; i++){
        if (strArray[i] === name){
            strArray.splice(i, 1);
             str = strArray.join("::");
        }
    }
    return str;
}



module.exports = router;
