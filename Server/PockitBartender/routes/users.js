'use strict';
var express = require('express');
var router = express.Router();
var db = require('../database');


/* GET users listing. */
router.get('/:name', function (req, res) {
    var name = req.params.name;

    var userCol = db.collection('users');

    userCol.doc(name).get()
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
        });

});

router.post('/', function (req, res) {
    console.log(req.body.name);
    var name = req.body.name;
    var password = req.body.password;

    var userCol = db.collection('users');

    userCol.doc(name).set({
        name,
        password
    });

    res.send({ name, password });

});

module.exports = router;


module.exports = router;
