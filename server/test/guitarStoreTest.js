'use strict';

let GuitarStore = require('../src/guitarStore');
let assert = require('chai').assert;
let mongoose = require('mongoose');
let mockgoose = require('mockgoose');
mockgoose(mongoose);

before(done => {
    mongoose.connect('mongodb://localhost/TestingDB', err => {
        done(err);
    });
});

describe('GuitarStore', function() {

    let guitarStore;

    beforeEach(() => {
        guitarStore = new GuitarStore();
    });

    it('adds a guitar', done => {
        guitarStore.add('MX325235', 'Fender', 'Stratocaster', 2011, 'Mexico');
        guitarStore.findBySerialNumber('MX325235').then(guitar => {
            assert.equal(guitar.make, 'Fender');
            done();
        });
    });
});