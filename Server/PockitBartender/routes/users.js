'use strict';
var express = require('express');
var router = express.Router();
var cors = require('cors');
var db = require('../database');


/* GET users listing. */
router.get('/:id', function (req, res) {
    var id = req.params.id;

    var userCol = db.collection('users');

    userCol.doc(id).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('Does not exist');
                res.send('boo');
            } else {
                console.log(doc.data());
                res.send(doc.data());
            }
        })
        .catch(err => {
            console.log('something bad');
            res.send('boo');
        });

});

router.post('/', function (req, res) {
    console.log('starting to save user');
    console.log(res.body)

    try {
        var body = req.body;

        var userName = body.userName;
        var phoneNumber = body.phoneNumber;
        var email = body.email;
        var id = body.id;

        var userCol = db.collection('users');

        var user = {
            userName,
            phoneNumber,
            email,
            id
        }

        userCol.doc(id).set(user, function (error) {
            if (error) {
                res.send('boo');
            } else {
                res.send(user);
            }
        });
        res.send(user);
    } catch (ex) {
        console.log(ex);
        res.send('boo');
    }
});

module.exports = router;
