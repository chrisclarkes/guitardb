'use strict';

let express = require('express');
let router = express.Router();
let GuitarStore = require('./guitarStore');

let store = new GuitarStore();

router.get('/:serialNumber', (req, res) => {
    store.findBySerialNumber(req.params.serialNumber).then(guitar => {
        if (guitar) {
            res.json({ 
                serialNumber: guitar.serialNumber,
                make: guitar.make,
                model: guitar.model,
                year: guitar.year,
                factory: guitar.factory
            });  
        } else {
            res.status(404);
            res.json({});
        }
    }).fail(err => {
        res.send(err);
    });
});

module.exports = router;