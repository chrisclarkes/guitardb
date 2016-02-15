'use strict';

let Q = require('q');
let mongoose = require('mongoose');
let guitarSchema = new mongoose.Schema({
    serialNumber: String,
    make: String,
    model: String,
    year: Number,
    factory: String
});

let Guitar = mongoose.model('Guitar', guitarSchema);

class GuitarStore {

    add(serialNumber, make, model, year, factory) {
        let guitarDeferred = Q.defer();
        let guitar = new Guitar({serialNumber, make, model, year, factory});

        guitar.save((err, guitar) => {
            if (err) {
                guitarDeferred.reject(err);
            } else {
                guitarDeferred.resolve(guitar);
            }
        });
        return guitarDeferred.promise;
    }

    findBySerialNumber(serialNumber) {
        let guitarDeferred = Q.defer();
        Guitar.findOne({ serialNumber }, (err, guitar) => {
            if (err) {
                guitarDeferred.reject(err);
            } else {
                guitarDeferred.resolve(guitar);
            }
        });
        return guitarDeferred.promise;
    }

}

module.exports = GuitarStore;